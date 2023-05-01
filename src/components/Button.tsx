/* eslint-disable @typescript-eslint/naming-convention */
import { EXTENSION_CONSTANT } from 'constant';
function Button(){
    return (
        <button className='button' id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON}>
            explain up
        </button>
    );
}

export default Button;