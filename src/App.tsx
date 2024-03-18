import clsx from 'clsx';
import UserProfile from './UserProfile.tsx/UserProfile';
import { User } from './features/users/types';
import { AppDispatch } from './app/store';
import UserList, { UserListItem } from './UserList/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, fetchUsers } from './features/users/usersSlice';
import { useEffect, useRef, useState } from 'react';
import './_app.scss';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectors.selectAll);
    const ref = useRef<HTMLDivElement>(null);
    const [currUser, setUser] = useState<User | null>(null);
    const [currentPage, setPage] = useState(0);
    const [fetching, setFetch] = useState(true);

    const handleScroll = () => {
        if (!ref.current) return;
        if (ref.current.scrollHeight - ref.current.scrollTop < 450) setFetch(true);
    };

    useEffect(() => {
        if (fetching) {
            dispatch(fetchUsers({ offset: currentPage * 100, limit: 100 })).then((v) => {
                if ((v.payload as User[]).length === 0) {
                    ref.current?.removeEventListener('scroll', handleScroll);
                    return;
                }
                setPage((prev) => prev + 1);
            }).finally(() => {
                setFetch(false);
            });
        }
    }, [dispatch, fetching, currentPage])
    
    useEffect(() => {
        const current = ref.current;
        current?.addEventListener('scroll', handleScroll);
        return () => current?.removeEventListener('scroll', handleScroll);
    }, [ref]);

    return (
        <div className="App" style={{ height: '450px' }}>
            <UserList refProp={ref}>
                {users.map((user) => (
                    <UserListItem
                        className={clsx(user.id === currUser?.id && 'selected')}
                        onClick={() => {
                            setUser(user);
                        }} key={user.id}
                        name={user.name}
                    />
                ))} 
            </UserList>
            <UserProfile user={currUser} />
        </div>
    );
}

export default App;
