

export default{

    state: {
        accessPrivileges : {
             // Home
            GLOBAL_ACCESS : 1111100001,



            // System Announcement
            SAVE_SYSTEM_ANNOUNCEMENT : 1110111001,
            READ_SYSTEM_ANNOUNCEMENT : 1111101100,
            DELETE_SYSTEM_ANNOUNCEMENT : 1111101110,
            UPDATE_SYSTEM_ANNOUNCEMENT : 1110001100,
            UPLOAD_SYSTEM_ANNOUNCEMENT_FILE : 1110110010,
            DELETE_SYSTEM_ANNOUNCEMENT_FILE : 1110010111,


            // User
            SAVE_USER : 1110101100,
            READ_ALL_USERS : 1111000100,
            READ_USER : 1111111011,
            DELETE_USER : 1111000010,
            UPDATE_USER : 1110110011,
            READ_USER_STATUSES: 1001101000,
            UPDATE_USER_VISIBILITY: 1000100000,

            // Course
            SAVE_COURSE : 1111011111,
            READ_ALL_COURSES : 1110111111,
            DELETE_COURSE : 1111111101,
            UPDATE_COURSE : 1110010000,
            READ_COURSES_BY_VISIBILITY : 1111011011,
            READ_COURSE_STATUSES : 1111110100,
            UPDATE_COURSE_VISIBILITY : 1110000000,

            // Authority
            SAVE_AUTHORITY : 1111101000,
            READ_ALL_AUTHORITIES : 1110010100,
            DELETE_AUTHORITY : 1111111001,
            UPDATE_AUTHORITY : 1110001101,


            // Privilege
            READ_ALL_PRIVILEGES : 1111000110,



            // Default Authority
            READ_DEFAULT_AUTHORITIES_AND_PRIVILEGES : 1110000100,
            UPDATE_DEFAULT_AUTHORITY : 1110101010,
            SAVE_DEFAULT_AUTHORITY : 1111001010,
            DELETE_DEFAULT_AUTHORITY : 1111100010,





            // PAGE PRIVILEGES

            PAGE_USER_FOR_ADMIN : 1110011011,
            PAGE_COURSE_FOR_ADMIN : 1111011001,
            PAGE_AUTHORITIES : 1111111100,
            PAGE_HOME : 1110101111,
            PAGE_COURSES : 1111000011,
            PAGE_GLOBAL_CALENDAR : 1110011111,
            PAGE_GLOBAL_QA : 1110001001,
            PAGE_SYSTEM_ANNOUNCEMENT : 1111110000,
            PAGE_USER_DETAILS : 1110011101,
            PAGE_OWN_PROFILE : 1110100001,
            PAGE_SETTINGS : 1111110101,
            PAGE_GLOBAL_RESOURCES : 1110011000,




            // PAGE COURSE PRIVILEGES
            PAGE_COURSE: 1010101010,
            PAGE_COURSE_ANNOUNCEMENT : 1111011101,
            PAGE_COURSE_GRADES : 1111001001,
            PAGE_COURSE_ASSIGNMENTS : 1110101000,
            PAGE_COURSE_QT : 1111001110,
            PAGE_COURSE_RESOURCES : 1110000101,
            PAGE_COURSE_QA : 1111010101,
            PAGE_COURSE_CALENDAR : 1111010001,
            PAGE_COURSE_USERS: 1110000010,
            PAGE_COURSE_ENROLLMENT_REQUEST: 1101010101,
            PAGE_COURSE_ENROLLED_STUDENTS: 1101110001,
            PAGE_COURSE_AUTHENTICATED_USERS: 1101111100,
            PAGE_COURSE_SETTINGS : 1111110011,


            // COURSE ANNOUNCEMENT
            SAVE_COURSE_ANNOUNCEMENT : 1110010101,
            DELETE_COURSE_ANNOUNCEMENT : 1111000111,
            UPDATE_COURSE_ANNOUNCEMENT : 1111010110,
            READ_COURSE_ANNOUNCEMENT : 1110101110,
            // COURSE GRADE
            SAVE_COURSE_GRADE : 1110110110,
            DELETE_COURSE_GRADE : 1111001101,
            UPDATE_COURSE_GRADE : 1111010111,
            READ_COURSE_GRADE : 1110010011,

            // COURSE SCORE
            SAVE_COURSE_SCORE : 1110110001,
            DELETE_COURSE_SCORE : 1110100011,
            UPDATE_COURSE_SCORE : 1110001011,
            READ_ALL_COURSE_SCORES : 1110100010,
            READ_OWN_COURSE_SCORES : 1010000001,



            // COURSE ASSIGNMENT
            SAVE_COURSE_ASSIGNMENT : 1110001111,
            DELETE_COURSE_ASSIGNMENT : 1110101101,
            UPDATE_COURSE_ASSIGNMENT : 1110011100,
            READ_ALL_COURSE_ASSIGNMENTS : 1110000011,
            READ_OWN_COURSE_ASSIGNMENTS : 1110000001,
            UPLOAD_OWN_COURSE_ASSIGNMENT_FILE : 1110100000,
            UPLOAD_COURSE_ASSIGNMENT_FILE : 1111100110,
            DELETE_OWN_COURSE_ASSIGNMENT_FILE : 1110110111,
            DELETE_COURSE_ASSIGNMENT_FILE : 1110101011,



            // COURSE QT
            SAVE_COURSE_QT : 1111111111,
            DELETE_COURSE_QT : 1110111010,
            UPDATE_COURSE_QT : 1111000000,
            VERIFY_COURSE_QT : 1110010010,
            JOIN_COURSE_QT : 1111000101,
            READ_COURSE_QT: 1101000011,
            PUBLISH_COURSE_QT: 1000100100,
            READ_NOT_PUBLISHED_COURSE_QT: 1000111000,            

            // COURSE RESOURCE
            SAVE_COURSE_RESOURCE : 1110011010,
            DELETE_COURSE_RESOURCE : 1110100101,
            UPDATE_COURSE_RESOURCE : 1110011110,
            READ_ALL_COURSE_RESOURCES : 1110010001,
            UPLOAD_COURSE_RESOURCE_FILE : 1110011001,
            DELETE_COURSE_RESOURCE_FILE : 1111001111,



            // COURSE QA
            SAVE_COURSE_QA : 1111011100,
            DELETE_COURSE_QA : 1110110101,
            DELETE_OWN_COURSE_QA : 1111101111,
            UPDATE_COURSE_QA : 1110001010,
            VERIFY_COURSE_QA : 1111111000,
            LIKE_COURSE_QA : 1110111110,
            STAR_COURSE_QA : 1111100000,
            UPDATE_OWN_COURSE_QA: 1010011110,


            READ_AUTHENTICATED_USERS: 1101011111,


            SAVE_COURSE_CALENDAR : 1111010000,
            DELETE_COURSE_CALENDAR : 1111110111,
            UPDATE_COURSE_CALENDAR : 1111111110,
            READ_COURSE_CALENDAR : 1111101010,

            // Enrolment
            ENROLL_COURSE : 1111110110,
            APPROVE_ENROLLMENT_REQUEST : 1111000001,
            READ_ENROLLMENT_REQUESTS : 1110111101,
            READ_REQUESTED_ENROLLMENT_REQUESTS : 1111111010,
            CANCEL_ENROLLMENT_REQUEST : 1111011010,
            REJECT_ENROLLMENT_REQUEST : 1111010100,
            READ_REGISTERED_STUDENTS : 1111101101,
            READ_NOT_REGISTERED_COURSES : 1110100110,
            READ_REGISTERED_COURSES : 1111100101,
            READ_AUTHENTICATED_COURSES : 1110001110,


            SAVE_AUTHENTICATED_USER : 1110111000,
            DELETE_AUTHENTICATED_USER : 1110000111,
            UPDATE_AUTHENTICATED_USER : 1011101010,


            
            READ_GLOBAL_CALENDAR: 1010101001,
            DELETE_GLOBAL_CALENDAR: 1100110001,
            UPDATE_GLOBAL_CALENDAR: 1000011010,
            SAVE_GLOBAL_CALENDAR: 1001111011,
        

            SAVE_GLOBAL_QA: 1100011001,
            DELETE_GLOBAL_QA: 1100111110,
            DELETE_OWN_GLOBAL_QA: 1011011001,
            UPDATE_OWN_GLOBAL_QA: 1000000101,
        
            UPDATE_GLOBAL_QA: 1010000100,
            VERIFY_GLOBAL_QA: 1010111111,
            VOTE_GLOBAL_QA: 1101110101,
            STAR_COURSE_QA: 1010101100,
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
