/* eslint-disable @typescript-eslint/naming-convention */
import Button from 'components/Button';

interface LeftPanelProp {
    message: string
}

function LeftPanel({
    message
}: LeftPanelProp){
    return (
        <div className='panel-wrapper'>
            {/* <span className='panel-info'>{message}</span> */}
            <h1 className='panel-info'>Dev.sh</h1>
            <p>dev.sh is a comprehensive VS Code extension that provides a suite of developer tools to enhance coding efficiency and productivity. With three powerful features, dev.sh aims to simplify common coding, Docker, and Git workflows.</p>
            <br></br>
           <Button></Button>
        </div>
    );
}

export default LeftPanel;