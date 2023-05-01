/* eslint-disable @typescript-eslint/naming-convention */
import Button from "components/Button";
import { useState } from "react";


interface LeftPanelProp {
	message: string;
}

function LeftPanel({ message }: LeftPanelProp) {
	const [inputEN, setInputEN] = useState("");

	function handleInputChange(event) {
		setInputEN(event.target.value);
	}

	return (
		<div className="panel-wrapper">
			<span className="panel-info">
				Streamline your Developer Worflows.
			</span>
            <br></br>
			<div className="input-box">
				<label htmlFor="inputEN">What's on your mind?</label>
                <br></br>
				<input
					type="text"
					id="inputEN"
					value={inputEN}
                    placeholder="how to deploy to dockerhub? "
					onChange={handleInputChange}
					className="input-field" // add a class for styling the input field
				/>
			</div>
            <div className="textarea-box">
        <label htmlFor="textareaEN">Enter Code:</label>
        <br />

      </div>
		</div>
	);
}

export default LeftPanel;
