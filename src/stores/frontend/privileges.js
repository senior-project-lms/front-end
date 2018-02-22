

export default{

    state: {
        accessPrivileges : {
            GLOBAL_ACCESS: 11100001,
            //    READ_HOME_DATA: 11100000,
            //    UPDATE_HOME_DATA: 11101110,
            //    ADD_FAVORITE_DATA: 11100001,
            
            SAVE_SYSTEM_ANNOUNCEMENT: 10111001,
            READ_SYSTEM_ANNOUNCEMENT: 11101100,
            DELETE_SYSTEM_ANNOUNCEMENT: 11101110,
            UPDATE_SYSTEM_ANNOUNCEMENT: 10001100,
            UPLOAD_SYSTEM_ANNOUNCEMENT_FILE: 10110010,
            DELETE_SYSTEM_ANNOUNCEMENT_FILE: 10010111,
        
        
        
            // User
            SAVE_USER: 10101100,
            READ_ALL_USERS: 11000100,
            READ_USER: 11111011,
            DELETE_USER: 11000010,
            UPDATE_USER: 10110011,
        
            // Course
            SAVE_COURSE: 11011111,
            READ_ALL_COURSES: 10111111,
            DELETE_COURSE: 11111101,
            UPDATE_COURSE: 10010000,
            READ_REGISTERED_COURSES: 11100101,
            READ_AUTHENTICATED_COURSES: 10001110,
            READ_COURSES_BY_VISIBILITY: 11011011,
            READ_COURSE_STATUSES: 11110100,
            UPDATE_COURSE_VISIBILITY: 10000000,
            READ_NOT_REGISTERED_COURSES: 10100110,
            ACCESS_COURSES_PAGE: 10000110,

        
            // Authority
            SAVE_AUTHORITY: 11101000,
            READ_ALL_AUTHORITIES: 10010100,
            DELETE_AUTHORITY: 11111001,
            UPDATE_AUTHORITY: 10001101,
            
            // Privilege
            READ_ALL_PRIVILEGES: 11000110,
        
            // Default Authority
            READ_DEFAULT_AUTHORITIES_AND_PRIVILEGES: 10000100,
            UPDATE_DEFAULT_AUTHORITY: 10101010,
            SAVE_DEFAULT_AUTHORITY: 11001010,
            DELETE_DEFAULT_AUTHORITY: 11100010,
        
        
            // Enrolment
            ENROLL_COURSE: 11110110,
            APPROVE_ENROLMENT_REQUEST: 11000001,
            READ_ENROLMENT_REQUESTS: 10111101
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
