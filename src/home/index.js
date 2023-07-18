import React, { Component } from 'react';
import { Card, Col, Row, Button, message, Upload } from 'antd';
import InvoiceForm from './components/invoiceForm';
import BlForm from './components/invoiceForm/blForm';
import Custom from './components/invoiceForm/custom';
import reqwest from 'reqwest';
import './index.scss';


const parmasList =[
	{
		"text": "",
		"single": "托运人\n收货人\n收货地点\n船舶名称\n航次\n收货地点\n装货地点\n卸货港\nB/L号码\n交货地点\n货物内容",
		"image": "",
		"multiple": "",
		"item": "",
		"scene": "",
		"instruction": "",
		"max_length": 4096
	},
	{
		"text": "",
		"single": "税额\n商户\n单号\n时间\n金额",
		"image": "",
		"multiple": "",
		"item": "",
		"scene": "",
		"instruction": "",
		"max_length": 4096
	}
	// }, 
	// {
	// 	"text": "",
	// 	"single": "自定义字段1\n自定义字段2\n自定义字段3",
	// 	"image": "",
	// 	"multiple": "",
	// 	"item": "",
	// 	"scene": "",
	// 	"instruction": "",
	// 	"max_length": 4096
	// }
]
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusItem: 0,
			tabs: [
				{ tabName: 'Bill of Lading 海运套票', id: 0 },
				{ tabName: 'Receipt 发票', id: 1 },
				{ tabName: '自定义', id: 2 },
			],
			currentIndex: 0,
			imageUrl: ''
		};
	}

	changeLight(type = 0) {
		this.setState({ focusItem: type });
	}

	tabChoiced = (id) => {
		// tab切换到方法
		this.setState({
			currentIndex: id,
			focusItem: id
		});
	}
	

	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			);
		}
	};

	
	render() {
		let _this = this;
		let isBox1Show = this.state.currentIndex === 0 ? 'block' : 'none';
		let isbox2Show = this.state.currentIndex === 1 ? 'block' : 'none';
		let isbox3Show = this.state.currentIndex === 2 ? 'block' : 'none';
		let tabList = this.state.tabs.map((res, index) => {
			return <div key={index} onClick={this.tabChoiced.bind(_this, res.id)} className={`${"btn"} ${this.state.focusItem === res.id ? "active" : null}`}>{res.tabName}</div>;
		});


		const { imageUrl } = this.state;

		const formData = new FormData();

		const beforeUpload = (file) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			
			const { currentIndex } = this.state
			
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
			}
			const isLt2M = file.size / 1024 / 1024 < 10;
			if (!isLt2M) {
				message.error('Image must smaller than 2MB!');
			}
			
			formData.append('file', file);
			formData.append('billJson',JSON.stringify(parmasList[currentIndex]));
			console.log(formData,'formData');
			
		}

		// const parserFile =() => {
		// 	reqwest({
		// 		url: 'http://1.116.37.178:8090/api/ie',
		// 		method: 'post',
		// 		headers: {
		// 			Accept: 'application/json',
		// 		},
		// 		processData: false,
		// 		data: formData,
		// 		success: (data) => {
		// 			console.log(data);
		// 		  message.success('upload successfully.');
		// 		},
		// 		error: () => {
		// 		  message.error('upload failed.');
		// 		},
		// 		onFinish: ()=>{
		// 			message.error('onfinish');
		// 		}
		// 	  });
		// }

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
			<div className={"home"}>
				<div className={"homeTitle"}>通用票据识别</div>
				<span className={"homeTips"}>支持对多种票据类型（多票据）进行票据切分、票据分类、票据识别，同时可对多种票据检测以及关键信息提取，不限票据类型</span>
				<Card className={"homeCard"} bordered={false}>
					<Row>

						<Col span={12}>
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={this.handleChange}
							>
								{imageUrl ? (
									<img
										src={imageUrl}

										style={{
											height: "100%",
											width: '100%',
										}}
									/>
								) : (
									uploadButton
								)}
							</Upload>
							<Button htmlType="submit" onClick={parserFile()} className={"homeCardSubmit"}>Parse a file</Button>

						</Col>
						<Col span={12}>
							<div id="btnWrapper" className={`${"btnWrapper"} ${this.state.focusItem === 0 ? "btnWrapper1" : ''}`}>
								{tabList}
							</div>
							<div className={"homeContent"}>
								<span className={"homeContentTitle"}>内容输出</span>
								<div style={{ display: isBox1Show }}>
									<BlForm />
								</div>
								<div style={{ display: isbox2Show }}>
									<InvoiceForm />
								</div>
								{/* <div style={{ display: isbox3Show }}>
									<Custom></Custom>
								</div> */}
							</div>
						</Col>
					</Row>
				</Card>
			</div >
		);
	}
}