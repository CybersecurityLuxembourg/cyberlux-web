import React, { Component } from "react";
import "./Article.css";
import dompurify from "dompurify";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getBoxContent() {
		return <div className="Article card">
			<div className="card-img-wrapper">
				{this.props.info.image !== null && this.props.info.image !== undefined
					? <img
						className="card-img-top"
						src={getApiURL() + "public/get_public_image/" + this.props.info.image}
						alt="Card image cap"/>
					: <NoImage
						height={200}
					/>
				}
				{this.props.hidePublicationDate === undefined
					|| this.props.hidePublicationDate === false
					? <div className="card-date">
						{dateToString(this.props.info.publication_date, "DD MMM YYYY")}
					</div>
					: ""}
			</div>
			<div className="card-body">
				<h5 className="card-title">{this.props.info.title}</h5>

				<div className="card-text">
					<div dangerouslySetInnerHTML={{
						__html:
						dompurify.sanitize(this.props.info.abstract),
					}} />
				</div>

				<button
					className={"blue-background"}
				>
					Know more
				</button>
			</div>
		</div>;
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="Article-link">
				{this.getBoxContent()}
			</a>
			: <a
				href={"/news/" + this.props.info.handle}
				className="Article-link">
				{this.getBoxContent()}
			</a>;
	}
}
