import { PropsWithChildren } from "react";
import './_user-list.scss';
import logo from '../user-logo.svg';

interface UserListItemProps extends React.HTMLProps<HTMLLIElement> {
    name: string,
};

interface UserListProps extends PropsWithChildren {
    refProp: any,
}

const UserListItem = ({ name, ...props }: UserListItemProps) => (
    <li {...props}>
        <img src={logo} />
        <span>{name}</span>
    </li>
);

const UserList = ({ refProp, children }: UserListProps) => (
    <div ref={refProp} className="user-list">
        <ul>
            {children}
        </ul>
    </div>
);

export default UserList
export { UserListItem };
