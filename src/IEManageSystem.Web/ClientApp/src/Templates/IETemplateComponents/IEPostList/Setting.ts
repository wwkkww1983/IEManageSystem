import PageComponentSettingModel from "BaseCMSManage/Models/Pages/PageComponentSettingModel"

export default class Setting {
    setting: PageComponentSettingModel;
    
    constructor(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    setSetting(pageComponentSetting:PageComponentSettingModel){
        this.setting = pageComponentSetting;
    }

    get col(){
        return this.setting.getDefauleData().field1 || 5;
    }

    set col(val){
        this.setting.getDefauleData().field1 = val;
    }

    get heigth(){
        return this.setting.getDefauleData().field2;
    }

    set heigth(val){
        this.setting.getDefauleData().field2 = val;
    }

    get isShowImg(){
        return this.setting.getDefauleData().field3 || "true";
    }

    set isShowImg(val){
        this.setting.getDefauleData().field3 = val;
    }

    get hiddenSortBtn(){
        return this.setting.getDefauleData().field4 || "false";
    }

    set hiddenSortBtn(val){
        this.setting.getDefauleData().field4 = val;
    }
    
    get hiddenPageing(){
        return this.setting.getDefauleData().field5 || "false";
    }

    set hiddenPageing(val){
        this.setting.getDefauleData().field5 = val;
    }
}