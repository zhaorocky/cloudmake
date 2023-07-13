import React, { Component } from 'react';
import { Form, Input, message, Row, Col } from 'antd';
import style from './index.scss';

const { TextArea } = Input;
const FormItem = Form.Item;

class BasicForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let formItemLayout = null;

		return (
			<div>
				<Form layout="vertical" style={{ width: '96%' }}>
					<Row gutter={60}>
						<Col span={12}>
							<FormItem label="发票号码" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="时间" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="地址" {...formItemLayout}>

								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>

						<Col span={12}>
							<FormItem label="总金额" {...formItemLayout}>

								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem label="购买内容" {...formItemLayout}>
								<TextArea
									autoSize={{
										minRows: 5,
										maxRows: 6,
									}}
									className={style.invoiceInput}
								/>
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem label="税点" {...formItemLayout}>
								<Input className={style.invoiceInput} />
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create({ name: 'invoiceForm' })(BasicForm);