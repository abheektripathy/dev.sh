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
			<br />
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
			<br />
			<span>
				{" "}
				<Button></Button>        <button className='button' >
            code it
        </button>{" "}
			</span>
			<br />
			<div className="input-box-a">
				<label htmlFor="inputEN">Here's your code</label>
				<br></br>

				<textarea
					id="inputEN"
					value={inputEN}
					placeholder="
                        steps:
                        - name: Checkout code
                          uses: actions/checkout@v2
                        - name: Login to DockerHub
                          uses: docker/login-action@v1
                          with:
                            username: ${{ secrets.DOCKER_USERNAME }}
                            password: ${{ secrets.DOCKER_PASSWORD }}
                        - name: Build and push Docker image
                          uses: docker/build-push-action@v2
                          with:
                            push: true
                            tags: username/repo:latest
                     "
					onChange={handleInputChange}
					className="input-field-a" // add a class for styling the input field
				/>
			</div>
			{/* <div className="input-box">
            <pre>
				<textarea
					className="input-field"
					defaultValue="// Your code here"
				/>
			</pre>
            </div> */}
		</div>
	);
}

export default LeftPanel;
