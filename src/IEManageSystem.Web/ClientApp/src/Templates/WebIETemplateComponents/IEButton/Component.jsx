import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Button } from 'antd';
import Setting from 'IETemplateComponents/IEButton/Setting'
import {getIconType} from 'Common/AntIcons'
import {withRouter} from 'react-router-dom'

class Component extends IComponent {
    render() {
        let setting = new Setting(this.getSetting("BtnSetting"));
        let Icon;
        if(setting.icon){
            let IconType = getIconType(setting.icon);
            Icon = <IconType />
        }

        return (
        <Button 
            icon={Icon}
            style={{backgroundColor: setting.bgcolor, color: setting.color}} 
            shape={setting.shape} type={setting.btnType} size={setting.size}
            onClick={()=>{
                if(this.props.interactivClick){
                    this.props.interactivClick();
                    return;
                }
                if(setting.url.startsWith('http')){
                    window.location.href = setting.url;
                    return;
                }
                this.props.history.push(setting.url);
            }}
        >
            {this.props.interactivText || setting.text}
        </Button>
        );
    }
}

export default withRouter(Component);