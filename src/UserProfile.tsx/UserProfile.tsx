import { useEffect, useState } from 'react';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { update } from '../features/users/usersSlice';
import { User } from '../features/users/types';
import logo from '../user-logo.svg';
import './_user-profile.scss';

const UserProfile = ({ user }: { user: User | null }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [positionInput, setPositionInput] = useState<string>('');
    const [departmentInput, setDepartmentInput] = useState<string>('');
    const [companyInput, setCompanyInput] = useState<string>('');

    useEffect(() => {
        if (!user) return;
        setPositionInput(user.position);
        setDepartmentInput(user.department);
        setCompanyInput(user.company);
    }, [user]);

    return user && (
        <div className="user-profile">
            <header>
                <span>{user.name}</span>
            </header>
            <form onSubmit={(ev) => {
                ev.preventDefault();
                dispatch(update({id: user.id, changes: {
                    position: positionInput,
                    department: departmentInput,
                    company: companyInput,
                }}));
                
            }}>
                <img src={logo} alt="profile" />
                <ul>
                    <li key='1'>
                        <span>Должность </span>
                        <input
                            name="position"
                            type="text"
                            onChange={(v) => setPositionInput(v.currentTarget.value)}
                            value={positionInput}
                        />
                    </li>
                    <li key='2'>
                        <span>Отдел </span>
                        <input
                            name="department"
                            type="text"
                            onChange={(v) => setDepartmentInput(v.currentTarget.value)}
                            value={departmentInput}
                        />
                    </li>
                    <li key='3'>
                        <span>Компания </span>
                        <input
                            name="company"
                            type="text"
                            onChange={(v) => setCompanyInput(v.currentTarget.value)}
                            value={companyInput}
                        />
                    </li>
                </ul>
                <button type="submit" className="save-button">Сохранить</button>
            </form>
        </div>
    )
};

export default UserProfile;
