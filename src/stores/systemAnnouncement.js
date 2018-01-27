
import SystemAnnouncementService from "../services/systemAnnouncement";

var systemAnnouncementService = new SystemAnnouncementService();

export default{

    state: {
        systemAnnouncements: []
    },
    mutations:{
        setSystemAnnouncements(state, announcements){
             announcements = state.systemAnnouncements.concat(announcements);
             state.systemAnnouncements = announcements;
        },
        clearSystemAnnouncements(state){
            state.systemAnnouncements = [];
        }
    },
    actions:{
        getSystemAnnouncements(context, page){
            return systemAnnouncementService.getAll(page)
            .then(response => {
                if(response.status){
                    if(page == 0){
                        context.commit("clearSystemAnnouncements");
    
                    }
                    if(response.data != null && response.data.length > 0){
                        context.commit("setSystemAnnouncements", response.data);
                    }
                }
                return response;
            });
        },
        saveSystemAnnouncement(context, announcement){
            return systemAnnouncementService.save(announcement)
            .then(response => {
                if(response.status){
                   context.dispatch("getSystemAnnouncements", 0);
                  
                }
                return response;
            })
        },
        deleteSystemAnnouncement(context, publicKey){
            return systemAnnouncementService.delete(publicKey)
            .then(response => {
                if(response.status){
                     context.dispatch("getSystemAnnouncements", 0) 
                }
                return response;
            })
        },
             
        uploadSystemAnnouncementFile(context, file){
            return systemAnnouncementService.uploadFile(file);
        },

        deleteSystemAnnouncementFile(context, publicKey){
            return systemAnnouncementService.deleteFile(publicKey);
        },
       
        clearSystemAnnouncements(context){
            context.commit("clearSystemAnnouncements");
        }


    },
    getters:{
        systemAnnouncements(state){
            return state.systemAnnouncements;
        }        
    }

}