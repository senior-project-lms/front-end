
import CourseAnnouncementService from "../services/courseAnnouncement";

var courseAnnouncementService = new CourseAnnouncementService();

export default{

    state: {
        courseAnnouncements: []
    },
    mutations:{
        setCourseAnnouncements(state, announcements){
             announcements = state.courseAnnouncements.concat(announcements);
             state.courseAnnouncements = announcements;
        },
        clearCourseAnnouncements(state){
            state.courseAnnouncements = [];
       },
        clearCourseAnnouncementStore(state){
            state.courseAnnouncements = [];
        }
    },
    actions:{
        getCourseAnnouncements(context,data){
            
            return courseAnnouncementService.getAll(data.publicKey,data.page)
            .then(response => {
                if(response.status){
                    if(data.page == 1){
                        context.commit("clearCourseAnnouncements");
    
                    }
                    if(response.data != null && response.data.length > 0){
                        context.commit("setCourseAnnouncements", response.data);
                    }
                }
                return response;
            });
        },
        saveCourseAnnouncement(context, announcement){
            const publicKey=announcement.publicKey;
            const params=announcement.params;
            return courseAnnouncementService.save(publicKey,params)
            .then(response => {
                // if(response.status){
                //     const data ={
                //         publicKey:announcement.publicKey,
                //         page:1,
                //     }
                //    context.dispatch("getCourseAnnouncements",data);
                  
                // }
                return response;
            })
        },
        deleteCourseAnnouncement(context, publicKey){
            return courseAnnouncementService.delete(publicKey)
            .then(response => {
                if(response.status){
                     context.dispatch("getCourseAnnouncements",0) 
                }
                return response;
            })
        },
   
        clearCourseAnnouncements(context){
            context.commit("clearCourseAnnouncements");
        }


    },
    getters:{
        courseAnnouncements(state){
            return state.courseAnnouncements;
        }        
    }

}