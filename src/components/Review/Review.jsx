import React from 'react'
import { Row, Col, Avatar, Card, Rate } from 'antd';
import './style.less';
import moment from 'moment';
 const getFormatedDateTime = (secondsString, format) => moment(parseInt(secondsString || '')).format(format);
export default function Review({ data }) {
	const { comments, reviewerName, createdOn, rating } = data;
	return (
		<Card className="reviewCard">
			<Row gutter={2} justify="start">
				<Col lg={5} md={5} xs={24} sm={24}>
					<table cellPadding="5">
						<tbody>
							<tr>
								<td valign="middle">
									<Avatar className="reviewAvatar" >{reviewerName?.charAt(0)}</Avatar>
								</td>
								<td valign="middle">
									<b className="reviewerName">{reviewerName}</b>
									<p>{getFormatedDateTime(createdOn, 'll')}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</Col>
				<Col lg={19} md={19} xs={24} sm={24}>
					<div style={{textAlign: 'right'}}>
						<Rate disabled value={rating} />
					</div>
				</Col>
			</Row>
			<br />
			<Row>
				<Col span={30}>
					<p className="userComment">
						{comments}
					</p>
				</Col>
			</Row>
		</Card>
	)
}
