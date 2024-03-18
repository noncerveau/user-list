import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { User, fetchUsersParam } from './types';
import { RootState } from '../../app/store';

const usersAdapter = createEntityAdapter<User>();

export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async ({ offset, limit }: fetchUsersParam): Promise<Array<User>> => {
        const result = [];

        for (let i = offset; i < limit + offset; i++) {
            result.push({
                id: i,
                name: `Пользователь ${i + 1}`,
                department: '',
                position: '',
                company: '',
            });
        }

        return result;
    }
);

export const UsersSlice = createSlice({
    name: 'users',
    initialState: {
        users: usersAdapter.getInitialState({}),
    },
    reducers: {
        update: (state, action) => {
            usersAdapter.updateOne(state.users, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                usersAdapter.addMany(state.users, action.payload);
            })
            .addCase(fetchUsers.rejected, (_, action) => {
                console.error(action);
            });
    }
});

export const selectors = usersAdapter.getSelectors<RootState>(
    (state) => state.UsersReducer.users,
);

export const { update } = UsersSlice.actions;
export default UsersSlice.reducer;
