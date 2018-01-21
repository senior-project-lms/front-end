

export default{

    state: {
        accessPrivileges : {
            // SYSTEM_ANNNOUCEMENT
            SAVE_SYSTEM_ANNOUNCEMENT : 10111001,
            READ_SYSTEM_ANNOUNCEMENT : 11101100,
            DELETE_SYSTEM_ANNOUNCEMENT : 11101110,
            UPDATE_SYSTEM_ANNOUNCEMENT : 10001100,

            // USER
            SAVE_USER: 10101100,
            READ_ALL_USERS: 11000100,
            DELETE_USER: 11000010,
            UPDATE_USER: 10110011,

            // COURSE
            SAVE_COURSE: 11011111,
            READ_ALL_COURSES: 10111111,
            DELETE_COURSE: 11111101,
            UPDATE_COURSE: 10010000,
        }

    },
    mutations: {

    },
    actions: {

    },
    getters: {
        accessPrivileges(state){
            return state.accessPrivileges;
        }
    }

}
