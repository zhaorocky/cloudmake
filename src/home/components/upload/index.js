import React, { useState } from 'react';
import { message, Upload } from 'antd';
import style from './index.scss';

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 5;
	if (!isLt2M) {
		message.error('Image must smaller than 5MB!');
	}
	return isJpgOrPng && isLt2M;
};
const App = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const handleChange = (info) => {
		
		setImageUrl(URL.createObjectURL(info.file.originFileObj));
		// if (info.file.status === 'done') {
		// 	// Get this url from response in real world.
		// 	console.log(info.file);
		// 	setImageUrl(info.url);
		// }
	};
	const uploadButton = (
		<div>
			<div
				className={"homeCardUpDateImg"}
			>
				Upload a file
			</div>
		</div>
	);
	return (
		<>
		
			<Upload
				className={"homeCardUpDateImg"}
				listType="picture-card"
				showUploadList={false}
				beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{imageUrl ? (
					<img
						src={imageUrl}

						style={{
							height:"100%",
							width: '100%',
						}}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		</>
	);
};
export default App;