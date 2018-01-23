
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
                if(page == 0){
                    context.commit("clearSystemAnnouncements");

                }
                if(response != null && response.length > 0){
                    context.commit("setSystemAnnouncements", response);
                    return true;
                }
                return false;
            });
        },
        saveSystemAnnouncement(context, announcement){
            return systemAnnouncementService.save(announcement)
            .then(response => {
                if(response){
                   return context.dispatch("getSystemAnnouncements", 0) 
                      .then(() => {
                        return true;
                    });
                  
                }
                else{
                    return false;
                }
            })
        },
        deleteSystemAnnouncement(context, publicKey){
            return systemAnnouncementService.delete(publicKey)
            .then(response => {
                if(response){
                    return context.dispatch("getSystemAnnouncements", 0) 
                    .then(() => {
                        return true;
                     });
                }
                else{
                    return false;
                }
            })
        },
        uploadSystemAnnouncementImage(context, image){
            return systemAnnouncementService.uploadImage(image)
            .then(data => {
                if(data != null && data != undefined){
                    return {
                        publicKey: data.publicKey,
                        name: data.name,
                        url: data.path,
                    }
                }
                return null;
            });
        },
        deleteSystemAnnouncementImage(context, publicKey){
            return systemAnnouncementService.deleteImage(publicKey);
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