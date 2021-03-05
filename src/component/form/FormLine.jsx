import React from "react";
import "./FormLine.css";
import Select from "react-select";
import { CountryDropdown, RegionDropdown, CountryRegionData } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import _ from "lodash";
import Chip from "./Chip.jsx";
import CheckBox from "./CheckBox.jsx";

export default class FormLine extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.getFormatClassName = this.getFormatClassName.bind(this);
		this.addValue = this.addValue.bind(this);
		this.deleteValue = this.deleteValue.bind(this);

		this.state = {
			value: props.value,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.value !== this.props.value) {
			this.setState({ value: this.props.value });
		}
	}

	onClick() {
		const newState = !this.props.value;
		if (typeof this.props.onClick !== "undefined" && this.props.disabled !== true) this.props.onClick(newState);
	}

	onChange(value) {
		this.setState({ value });

		if (typeof this.props.onChange !== "undefined") this.props.onChange(value);
	}

	onBlur(value) {
		if (typeof this.props.onBlur !== "undefined") this.props.onBlur(value);
	}

	addValue(valueToAdd) {
		if (this.state.value.indexOf(valueToAdd) < 0) {
			const value = _.cloneDeep(this.state.value);
			value.push(valueToAdd);
			this.setState({ value });
			this.props.onChange(value);
		}
	}

	deleteValue(valueToDelete) {
		let value = _.cloneDeep(this.state.value);
		value = value.filter((v) => v !== valueToDelete);
		this.setState({ value });
		this.props.onChange(value);
	}

	getFormatClassName() {
		if (this.props.format === undefined) {
			return "";
		}
		if (this.props.format(this.state.value)) return "FormLine-right-format";
		return "FormLine-wrong-format";
	}

	getSelectStyle() {
		return {
			input: () => ({
				height: "32px !important",
			}),
			control: (base, state) => ({
				...base,
				border: state.isFocused ? "2px solid #000 !important" : "2px solid lightgrey !important",
				boxShadow: 0,
			}),
			singleValue: (base, state) => ({
				...base,
				color: "inherit !important",
			}),
		};
	}

	render() {
		const labelWidth = "col-md-" + (this.props.fullWidth ? 12 : (this.props.labelWidth ? this.props.labelWidth : 6));
		const fieldWidth = "col-md-" + (this.props.fullWidth ? 12 : (this.props.labelWidth ? 12 - this.props.labelWidth : 6));

		return (
			<div className={"FormLine"}>
				<div className={"row"}>
					<div className={labelWidth}>
						<div className={"FormLine-label"}>
							{this.props.label}
						</div>
					</div>
					<div className={fieldWidth}>
						{this.props.type === "textarea"
							? <textarea
								value={this.state.value}
								onChange={(v) => this.onChange(v.target.value)}
								onBlur={(v) => this.onBlur(v.target.value)}
								disabled={this.props.disabled}
								autoFocus={this.props.autofocus}
								onKeyDown={this.props.onKeyDown}
							/>
							: this.props.type === "checkbox"
								? <CheckBox
									value={this.state.value}
									onClick={(v) => this.onChange(v)}
									disabled={this.props.disabled}
									background={this.props.background}
								/>
								: this.props.type === "select"
									? <Select
										value={{
											label: this.props.options.filter((o) => o.value === this.state.value).length > 0
												? this.props.options.filter((o) => o.value === this.state.value)[0].label
												: this.state.value,
											value: this.state.value,
										}}
										styles={this.getSelectStyle()}
										options={this.props.options}
										onChange={(v) => this.onChange(v.value)}
									/>
									: this.props.type === "multiselect"
										? <div>
											<Select
												value={null}
												styles={this.getSelectStyle()}
												options={this.props.options}
												onChange={(v) => this.addValue(v.value)}
											/>
											<div className="FormLine-chips">
												{(Array.isArray(this.state.value) ? this.state.value : []).map((o) => (
													<Chip
														label={this.props.options.filter((op) => op.value === o)[0].label}
														value={o}
														onClick={(v) => this.deleteValue(v)}
													/>
												))}
											</div>
										</div>
										: this.props.type === "country"
											? <CountryDropdown
												className={this.getFormatClassName()}
												value={this.state.value}
												onChange={(value) => this.onChange(value)}
											/>
											: this.props.type === "region"
												? <RegionDropdown
													className={this.getFormatClassName()}
													country={this.props.country}
													value={this.state.value}
													onChange={(value) => this.onChange(value)}
												/>
												: this.props.type === "phone"
													? <PhoneInput
														value={this.state.value}
														onChange={(value) => this.onChange(value)}
													/>
													:							<input
														className={this.getFormatClassName()}
														type={typeof this.props.type !== "undefined" ? this.props.type : "text"}
														value={this.state.value}
														onChange={(v) => this.onChange(v.target.value)}
														onBlur={(v) => this.onBlur(v.target.value)}
														disabled={this.props.disabled}
														autoFocus={this.props.autofocus}
														onKeyDown={this.props.onKeyDown}
													/>
						}
					</div>
				</div>
			</div>
		);
	}
}
