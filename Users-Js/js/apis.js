import { USERS_ENDPOINT } from "./constants.js";
const API = {
    getUsers: async () => {
        const response = await fetch(USERS_ENDPOINT);
        if(!response.ok) throw new Error('Xảy ra lỗi load dữ liệu từ API');
        return response.json();
    },
    addUser: async (user) => {
        const response = await fetch(USERS_ENDPOINT, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(user)
        });
        if(!response.ok) throw new Error('Xảy ra lỗi khi thêm dữ liệu');
        return response.json();
    },
    updateUser: async (id, user) => {
        const response = await fetch(`${USERS_ENDPOINT}${id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        if(!response.ok) throw new Error('Xảy ra update dữ liệu');
        return response.json();
    },
    deleteUser: async (id) => {
        const response =await fetch (`${USERS_ENDPOINT}${id}`,{
            method: 'DELETE',
        });
        if(!response.ok) throw new Error('Xảy ra lỗi khi xóa dữ liệu');
    }

}
export{ API };