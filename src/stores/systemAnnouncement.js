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
    },
    actions:{
        getSystemAnnouncements(context, page){
            return systemAnnouncementService.getAll(page)
            .then(response => {
                if(response != null && response.length > 0){
                    context.commit("setSystemAnnouncements", response);
                    return true;
                }
                return false;
            });
        },
        save(context, announcement){
            return systemAnnouncementService.save(announcement)
            .then(response => {
                if(response){
                    this.getSystemAnnouncements(1)
                    .then(() => {
                        return true;
                    });
                }
                else{
                    return false;
                }
            })
        },
        delete(context, publicKey){
            return systemAnnouncementService.delete(publicKey)
            .then(response => {
                if(response){
                    this.getSystemAnnouncements(1)
                    .then(() => {
                        return true;
                    });
                }
                else{
                    return false;
                }
            })
        },

    },
    getters:{
        systemAnnouncements(state){
            return state.systemAnnouncements;
        }        
    }

}