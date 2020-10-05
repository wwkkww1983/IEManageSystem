import React from 'react'
type IconNameType = 'GithubOutlined' 
| 'AccountBookFilled' 
| 'CaretDownOutlined' 
| 'CaretLeftFilled' 
| 'CaretRightFilled' 
| 'CaretUpFilled' 
| 'HighlightTwoTone' 
| 'HomeFilled' 
| 'IdcardOutlined' 
| 'RollbackOutlined' 
| 'SafetyCertificateFilled' 
| 'StarTwoTone' 
| 'StepBackwardFilled' 
| 'StepBackwardOutlined' 
| 'StepForwardFilled' 
| 'StepForwardOutlined' 
| 'StockOutlined' 
| 'StopOutlined' 
| 'UploadOutlined' 
| 'UsbFilled' 
| 'UserAddOutlined' 
| 'UserDeleteOutlined' 
| 'UsergroupAddOutlined' 
| 'UsergroupDeleteOutlined' 
| 'UserOutlined' 
| 'WeiboSquareFilled' 
| 'WhatsAppOutlined' 
| 'WifiOutlined' 
| 'WindowsFilled' 
| 'WomanOutlined' 
| 'ZhihuOutlined' 
| 'ZoomInOutlined' 
| 'QuestionCircleOutlined'
| 'SearchOutlined'
| 'MenuOutlined'
| 'MessageFilled'
| 'EllipsisOutlined'
| 'FireOutlined'
| 'HeartOutlined';

class AntIcons {
    icons : Map<string, React.Component>;
    getIcon : (name: IconNameType, style: any) => React.Component;
}

export default new AntIcons();