import React, { Component } from 'react';
import { Card, Col, Row, Button, message, Upload ,Spin} from 'antd';
import BlForm from './components/invoiceForm/blForm';
import BlForm1 from './components/invoiceForm/blForm1';
import Custom from './components/invoiceForm/custom';
import reqwest from 'reqwest';
import './index.scss';


// const parmasList =[
// 	{
// 		"single": ["托运人","收货人","收货地点","船舶名称","航次","收货地点","装货地点","卸货港","B/L号码","交货地点","货物内容"],
// 	},
// 	{
		
// 		"single": ["税额","商户","单号","时间","金额"]
	
// 	},
	
// 	{
// 		"single": [],
// 	}
// ]
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
				{ tabName: 'Customer', id: 2 }
			],
			currentIndex: 0,
			imageUrl: '',
			blFormData:{},
			loading: false,
			customerParams: [],
			parmasList :[
				{
					"single": ["shipper","consignee","receivingLocation","vesselName","voyage","dischargingPort","B/Lnumber","placeOfDelivery","descriptionOfGoods"],
				},
				{
					
					"single": ["tax","store","code","date","amount"]
				}
			]
		};
	}

	changeParamsList = (params) =>{
		this.setState({customerParams : params});
		console.log("params",this.state.customerParams);
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

			if(currentIndex == 2){
				formData.append('billJson',JSON.stringify({"single":this.state.customerParams}));
			}else{
				formData.append('billJson',JSON.stringify(this.state.parmasList[currentIndex]));
			}
			
		
		
			reqwest({
				url: 'http://1.116.37.178:8090/api/ie',
				method: 'post',
				headers: {
					Accept: 'application/json',
				},
				processData: false,
				data: formData,
				success: (response) => {
					getBase64(file, imageUrl =>
						this.setState({
						 imageUrl,
						 loading: false,
						}),
					   );

					if(response.resultCode == 200 ){
						const re  = JSON.parse(response.data)
						if(re.code == 200){
							this.setState({blFormData:re.result
							});
							message.success('upload successfully.');
						}else{
							message.error(re.message);
						}
						
						
					}else{
						message.error(response.errorMsg);
					}   
					
				  	
				},
				error: () => {
				  message.error('upload failed.');
				},
				onFinish: ()=>{
					message.error('onfinish');
				},
				complete: () => {
					
				},
			  });
		
			
		}

		

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

				<Spin spinning={this.state.loading}>

				

				<div className={"homeTitle"}>通用票据识别</div>
				<span className={"homeTips"}>支持对多种票据类型（多票据）进行票据切分、票据分类、票据识别，同时可对多种票据检测以及关键信息提取，不限票据类型</span>
				<Card className={"homeCard"} bordered={false}>
					<Row>

						<Col span={12}>
							<Upload
							
								className="homeCardUpDateImgShow"
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
							<Upload
							
								className="homeCardUpDateImgShow"
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={this.handleChange}
							>
								<Button htmlType="submit"  className={"homeCardSubmit"}>Parse a file</Button>
							</Upload>
							

						</Col>
						<Col span={12}>
							<div id="btnWrapper" className={`${"btnWrapper"} ${this.state.focusItem === 0 ? "btnWrapper1" : ''}`}>
								{tabList}
							</div>
							<div className={"homeContent"}>
								
								<div style={{ display: isBox1Show }}>
								<span className={"homeContentTitle"}>内容输出</span>
									<BlForm formData={this.state.blFormData}/>
								</div>
								<div style={{ display: isbox2Show }}>
								<span className={"homeContentTitle"}>内容输出</span>
									<BlForm1 formData={this.state.blFormData} />
								</div>
								{ <div style={{ display: isbox3Show }}>
								<span className={"homeContentTitle"}>自定义</span>
									<Custom formData={this.state.blFormData} changeParamsList = {this.changeParamsList} ></Custom>
								</div> }
							</div>
						</Col>
					</Row>
				</Card>
				</Spin>
			</div >
		);
	}
}