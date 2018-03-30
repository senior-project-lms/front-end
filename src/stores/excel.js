
import XLSX from 'xlsx'
/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
       excelJson: []
    },
    mutations: {
        setExcelJson(state, list){
            state.excelJson =  list;
        },
        clearExcelStore(state){
            state.excelJson = [];
        }
        
    },
    actions: {
        excelToJson(context, file){
            var url = URL.createObjectURL(file)

            /* set up XMLHttpRequest */
            var oReq = new XMLHttpRequest();
            oReq.open("GET", url, true);
            oReq.responseType = "arraybuffer";
            

            oReq.onload = function(e) {
                var arraybuffer = oReq.response;

                /* convert data to binary string */
                var data = new Uint8Array(arraybuffer);
                var arr = new Array();
                for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");

                /* Call XLSX */
                var workbook = XLSX.read(bstr, {type:"binary"});

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];
                //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
                var jsons =  XLSX.utils.sheet_to_json(worksheet,{raw:true});
                context.commit('setExcelJson', jsons);
            }

            oReq.send();
        },
        clearExcelJson(context){
            context.commit("setExcelJson", []);
        }

    },
    getters: {
        excelJson(state){
            return state.excelJson;
        }
    }
}