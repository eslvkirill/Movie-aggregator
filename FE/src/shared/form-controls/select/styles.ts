const color1 = '#fff';
const color2 = 'rgb(252, 237, 220)';
const fontSize = 18;

export default function selectStyles(
	backgroundMenu?: any,
	controlPosition?: any,
	controlPositionTop?: any,
	controlCursor?: any,
	widthControl = 380,
	fontSizeControl = fontSize,
	primaryColor = '#c76c04',
	backgroundControl = color1,
	backgroundValueContainer = color1,
	fontSizeValueContainer = fontSize,
	colorIndicatorsContainer = color1,
	backgroundOption = color1,
	backgroundHoverOption = color2,
	widthMenuList = 380,
	multiValueBackgroundColor = color2,
	fontSizeNoOptionsMessage = 20,
	scrollbarWidth = 7,
	indicatorSeparatorHeight = '90%',
	indicatorSeparatorMarginTop = 2.35,
	optionBorderBottomStyle = 'dotted',
	backgroundMenuList = color1,
	hoverColorDropdownIndicator = '#a35b09',
	backgroundScrollbar = color1,
	backgroundScrollbarThumb = '#bd5a31',
	fontSizeOption = '1rem',
	menuListMaxHeight = 180,
	rightClearIndicator = '12%',
	marginLeftInput = -8,
	overflowYControl = 'auto',
	isSelectedBackgroundOption = color1
) {
	return {
		control: (provided: any) => ({
			margin: 0,
			padding: 0,
			paddingBottom: 10,
			borderRadius: 10,
			alignItems: 'center',
			minHeight: 48.8,
			...provided,
			width: widthControl,
			maxHeight: 48.8,
			height: 48.8,
			fontSize: fontSizeControl,
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			overflowX: 'hidden',
			overflowY: overflowYControl,
			border: `2px solid ${primaryColor}`,
			background: backgroundControl,
			color: primaryColor,
			borderColor: primaryColor,
			borderStyle: 'solid',
			borderWidth: 2,
			boxShadow: 'none',

			':hover': {
				borderColor: primaryColor,
			},

			'::-webkit-scrollbar': {
				width: 0,
			},

			'>div': {
				alignItems: 'center',
				display: 'flex',
				flexWrap: 'wrap',
				paddingRight: 2,
				boxSizing: 'border-box',
				position: controlPosition,
				top: controlPositionTop,
				cursor: controlCursor,
			},
		}),
		placeholder: (styles: any) => ({
			...styles,
			color: 'rgb(168, 145, 118);',
			display: 'flex',
			justifyContent: 'start',
			alignItems: 'center',
			padding: 0,
			width: '100%',
			margin: 'auto',
			marginBottom: 0,
		}),
		valueContainer: (styles: any) => ({
			...styles,
			padding: 0,
			margin: 0,
			paddingLeft: 10,
			background: backgroundValueContainer,
			borderRadius: 10,
			fontSize: fontSizeValueContainer,
			':hover': {
				borderColor: 'red',
			},
		}),
		indicatorsContainer: (styles: any) => ({
			...styles,
			padding: 0,
			margin: 0,
			background: colorIndicatorsContainer,
			borderRadius: 10,
			':hover': {
				borderColor: 'red',
				cursor: 'pointer',
			},
		}),
		clearIndicator: (styles: any) => ({
			...styles,
			color: primaryColor,
			position: 'absolute',
			top: '8%',
			right: rightClearIndicator,
			padding: 0,
			transition: '.2s',
			':hover': {
				color: 'red',
				transition: '.2s',
				cursor: 'pointer',
			},
		}),
		dropdownIndicator: (styles: any) => ({
			...styles,
			color: primaryColor,
			position: 'absolute',
			top: '9%',
			fontWeight: 'bold',
			right: '0.5%',
			transition: '.2s',
			':hover': {
				color: hoverColorDropdownIndicator,
				cursor: 'pointer',
				transition: '.2s',
			},
		}),
		indicatorSeparator: (styles: any) => ({
			...styles,
			background: primaryColor,
			width: 2,
			height: indicatorSeparatorHeight,
			marginTop: indicatorSeparatorMarginTop,
			marginBottom: 0,
			marginRight: 35,
			marginLeft: 15,
		}),
		input: (styles: any) => ({
			...styles,
			color: primaryColor,
			maxHeight: 40,
			marginLeft: marginLeftInput,
			marginTop: -2,
			paddingTop: 0,
		}),
		container: (styles: any) => ({
			...styles,
			background: '#fff',
			borderRadius: 10,
			padding: 0,
			margin: 0,
			maxHeight: 48.8,
			':hover': {
				borderColor: 'red',
			},
		}),
		option: (provided: any, state: any) => ({
			...provided,
			borderBottom: `2px ${optionBorderBottomStyle} ${primaryColor}`,
			color: state.isSelected ? primaryColor : primaryColor,
			fontWeight: state.isSelected ? 'bold' : 'normal',
			padding: 5,
			maxHeight: 50,
			display: 'flex',
			justifyContent: 'start',
			alignItems: 'center',
			cursor: 'pointer',
			background: state.isSelected
				? isSelectedBackgroundOption
				: backgroundOption,
			transition: '.2s',
			fontSize: fontSizeOption,

			':hover': {
				background: backgroundHoverOption,
				transition: '.2s',
			},

			':before': {
				content:
					state.isSelected && isSelectedBackgroundOption === '#363507'
						? '"✓"'
						: '" "',
				position: 'relative',
				top: 0,
				left: 286,
			},
		}),
		menu: (provided: any) => ({
			...provided,
			marginTop: 6,
			background: backgroundMenu,
		}),
		menuList: (provided: any) => ({
			...provided,
			borderRadius: 10,
			maxHeight: menuListMaxHeight,
			width: widthMenuList,
			background: backgroundMenuList,

			'::-webkit-scrollbar': {
				width: scrollbarWidth,
			},
			'::-webkit-scrollbar-thumb': {
				borderRadius: 10,
				background: backgroundScrollbarThumb,
			},

			'::-webkit-scrollbar-track-piece': {
				background: backgroundScrollbar,
				borderRadius: 10,
				marginTop: 2,
				marginBottom: 2,
			},
		}),

		multiValue: (styles: any) => ({
			...styles,
			backgroundColor: multiValueBackgroundColor,
			display: 'flex',
			borderRadius: 4,
			margin: 2,
			marginRight: 4,
			paddingRight: 6,
			boxSizing: 'border-box',
			position: 'relative',
		}),
		multiValueLabel: (styles: any) => ({
			...styles,
			color: primaryColor,
		}),
		noOptionsMessage: (styles: any) => ({
			...styles,
			color: primaryColor,
			fontSize: fontSizeNoOptionsMessage,
		}),
		singleValue: (provided: any, state: any) => ({
			...provided,
			color: state.isSelected ? primaryColor : primaryColor,
			minHeight: '1px',
			paddingBottom: '2px',
		}),
	};
}
