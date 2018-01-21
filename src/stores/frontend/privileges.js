

export default{

    state: {
        accessPrivileges : {
            // SYSTEM_ANNNOUCEMENT
            SAVE_SYSTEM_ANNOUNCEMENT : 1000000001,
            READ_SYSTEM_ANNOUNCEMENT : 1000000010,
            DELETE_SYSTEM_ANNOUNCEMENT : 1000000100,
            UPDATE_SYSTEM_ANNOUNCEMENT : 1000001000,

            // USER
            SAVE_USER: 1000000011,
            READ_ALL_USERS: 1000000110,
            DELETE_USER: 1000001100,
            UPDATE_USER: 1000011000,

            // COURSE
            SAVE_COURSE: 1000000011,
            READ_ALL_COURSES: 1000000110,
            DELETE_COURSE: 1000001100,
            UPDATE_COURSE: 1000011000,
        
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
