import React from 'react'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEAnimation/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEAnimation//Setting'
import { Motion, spring, presets, StaggeredMotion } from 'react-motion'

const createStyles = {
    toRight: (value) => ({ left: `${value - 100}%`, position: 'relative' }),
    toBottom: (value) => ({ top: `${value - 100}%`, position: 'relative' }),
    toLeft: (value) => ({ right: `${value - 100}%`, position: 'relative' }),
    toTop: (value) => ({ bottom: `${value - 100}%`, position: 'relative' }),
    toLarge: (value) => ({ transform: `scale(${value / 100},${value / 100})`, position: 'relative' }),
    toOpacity: (value) => ({ opacity: value / 100, position: 'relative' }),
}

class IEAnimation extends IComponent {
    _ref = undefined;

    constructor(props) {
        super(props);

        let setting = new Setting(this.getDefaultSetting());
        this.initVal = new Number(setting.initValue).valueOf();
        if (isNaN(this.initVal)) {
            this.initVal = 0;
        }

        this.state = {
            value: this.initVal
        }

        this.onscroll = this.onscroll.bind(this);
        this.repeat = this.repeat.bind(this);
        this.repeatHandle = undefined;
    }

    componentDidMount() {
        let setting = new Setting(this.getDefaultSetting());
        if (setting.time == 'init') {
            this.setState({ value: 100 });
        }

        if (setting.time == 'scroll') {
            window.addEventListener('scroll', this.onscroll)
        }

        if(setting.time == 'repeat'){
            let repeatTime = new Number(setting.repeatTime).valueOf();
            if(isNaN(repeatTime) || repeatTime <= 0){
                repeatTime = 3;
            }
            this.repeatHandle = window.setInterval(this.repeat, repeatTime * 1000)

            // 为了提供性能，在浏览器看不见的时候，移除挂载
            
        }
    }

    componentWillUnmount(){
        let setting = new Setting(this.getDefaultSetting());

        if (setting.time == 'scroll') {
            window.removeEventListener('scroll', this.onscroll)
        }

        if(setting.time == 'repeat'){
            window.clearInterval(this.repeatHandle);
        }
    }

    onscroll(){
        let pos = this._ref.getBoundingClientRect()
        // 显示元素的范围
        let min = 200;
        let max = window.innerHeight - 200;

        // 向下滚动场景
        if (pos.top < max && this.state.value != 100) {
            if (pos.bottom < min) {
                return;
            }
            this.setState({ value: 100 });
            return;
        }
        if (pos.bottom < min && this.state.value != this.initVal) {
            this.setState({ value: this.initVal });
            return;
        }

        // 向上滚动场景
        if (pos.bottom > min && this.state.value != 100) {
            if (pos.top > max) {
                return;
            }
            this.setState({ value: 100 });
            return;
        }
        if (pos.top > max && this.state.value != this.initVal) {
            this.setState({ value: this.initVal });
            return;
        }
    }

    repeat(){
        if(this.state.value == this.initVal){
            this.setState({value: 100});
        }
        else{
            this.setState({value: this.initVal});
        }
    }

    render() {
        let setting = new Setting(this.getDefaultSetting());

        let createStyle = createStyles[setting.direction];
        if (!createStyle) {
            createStyle = createStyles.toRight
        }

        let childrens = this.props.children.map(item => {
            return {childVal: this.state.value}
        })

        let config = { stiffness: 180, damping: 12 };
        if(setting.speed){
            let speed = new Number(setting.speed).valueOf();
            if(!isNaN(speed) && speed > 0){
                config.stiffness = speed;
            }
        }

        return (<div
            style={{ position: 'relative', overflow: setting.isOverHidden == 'true' ? 'hidden' : 'visible' }}
            ref={(r) => { this._ref = r }}
            onMouseEnter={setting.time == 'hover' ? () => {
                this.setState({ value: 100 });
            } : undefined}
            onMouseLeave={setting.time == 'hover' ? () => {
                this.setState({ value: this.initVal });
            } : undefined}
        >
            <StaggeredMotion 
                key={childrens.length}
                defaultStyles={childrens}
                styles={prevInterpolatedStyles => {
                    return prevInterpolatedStyles.map((_, i) => {
                        return i === 0
                        ? {childVal: spring(this.state.value, config)}
                        : {childVal: spring(prevInterpolatedStyles[i - 1].childVal, config)}
                    })
                }}
            >
                {interpolatingStyles => {
                    return <>
                        {
                            interpolatingStyles.map((e, i)=>(
                                <div style={createStyle(e.childVal)}>
                                    {
                                        this.props.children[i]
                                    }
                                </div>
                            ))
                        }
                    </>
                }}
            </StaggeredMotion>
        </div>);
    }
}

export default (register) => register(IComponent, IEAnimation);