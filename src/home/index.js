import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'antd';
import InvoiceForm from './components/invoiceForm';
import BlForm from './components/invoiceForm/blForm';
import Custom from './components/invoiceForm/custom';
import ImgUpload from './components/upload/index';
import style from './index.scss';

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
			currentIndex: 0
		};
	}

	changeLight(type = 0) {
		this.setState({ focusItem: type });
	}

	tabChoiced=(id) => {
		// tab切换到方法
		this.setState({
			currentIndex: id,
			focusItem: id
		});
	}

	render() {
		let _this = this;
		let isBox1Show = this.state.currentIndex === 0 ? 'block' : 'none';
		let isbox2Show = this.state.currentIndex === 1 ? 'block' : 'none';
		let isbox3Show = this.state.currentIndex === 2 ? 'block' : 'none';
		let tabList = this.state.tabs.map((res, index) => {
		  return <div key={index} onClick={this.tabChoiced.bind(_this, res.id)} className={`${style.btn} ${this.state.focusItem === res.id ? style.active : null}`}>{res.tabName}</div>; 
		});

		return (
			<div className={style.home}>
				<div className={style.homeTitle}>通用票据识别</div>
				<span className={style.homeTips}>支持对多种票据类型（多票据）进行票据切分、票据分类、票据识别，同时可对多种票据检测以及关键信息提取，不限票据类型</span>
				<Card className={style.homeCard} bordered={false}>
					<Row>
						<Col span={12}>
							<ImgUpload className={style.homeCardUpDateImg}></ImgUpload>
							<Button className={style.homeCardSubmit}>submit</Button>
						</Col>
						<Col span={12}>
							<div id="btnWrapper" className={`${style.btnWrapper} ${this.state.focusItem === 0 ? style.btnWrapper1 : ''}`}>
								{tabList}
							</div>
							<div className={style.homeContent}>
								<span className={style.homeContentTitle}>内容输出</span>
								<div style={{ display: isBox1Show }}>
									<BlForm />
								</div>
								<div style={{ display: isbox2Show }}>
									<InvoiceForm />
								</div>
								<div style={{ display: isbox3Show }}>
									<Custom></Custom>
								</div>
							</div>
						</Col>
					</Row>
				</Card>
			</div>
		);
	}
}