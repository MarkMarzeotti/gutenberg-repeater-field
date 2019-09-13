/**
 * BLOCK: Gutenberg Repeater Field
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const {
	__,
} = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Button,
	IconButton,
	PanelBody,
	TextControl,
} = wp.components;
const {
	InspectorControls,
} = wp.editor;
const {
	Fragment,
} = wp.element;

/**
 * Register: Repeater Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'grf/gutenberg-repeater-field', {
	title: __( 'Gutenberg Repeater Field' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		locations: {
			type: 'array',
			default: [],
		},
	},
	keywords: [
		__( 'Gutenberg Repeater Field' ),
		__( 'Repeatable' ),
		__( 'ACF' ),
	],
	edit: ( props ) => {
		const handleAddLocation = () => {
			const locations = [ ...props.attributes.locations ];
			locations.push( {
				address: '',
			} );
			props.setAttributes( { locations } );
		};

		const handleRemoveLocation = ( index ) => {
			const locations = [ ...props.attributes.locations ];
			locations.splice( index, 1 );
			props.setAttributes( { locations } );
		};

		const handleLocationChange = ( address, index ) => {
			const locations = [ ...props.attributes.locations ];
			locations[ index ].address = address;
			props.setAttributes( { locations } );
		};

		let locationFields,
			locationDisplay;

		if ( props.attributes.locations.length ) {
			locationFields = props.attributes.locations.map( ( location, index ) => {
				return <Fragment key={ index }>
					<TextControl
						className="grf__location-address"
						placeholder="350 Fifth Avenue New York NY"
						value={ props.attributes.locations[ index ].address }
						onChange={ ( address ) => handleLocationChange( address, index ) }
					/>
					<IconButton
						className="grf__remove-location-address"
						icon="no-alt"
						label="Delete location"
						onClick={ () => handleRemoveLocation( index ) }
					/>
				</Fragment>;
			} );

			locationDisplay = props.attributes.locations.map( ( location, index ) => {
				return <p key={ index }>{ location.address }</p>;
			} );
		}

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Locations' ) }>
					{ locationFields }
					<Button
						isDefault
						onClick={ handleAddLocation.bind( this ) }
					>
						{ __( 'Add Location' ) }
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={ props.className }>
				<h2>Block</h2>
				{ locationDisplay }
			</div>,
		];
	},
	save: ( props ) => {
		const locationFields = props.attributes.locations.map( ( location, index ) => {
			return <p key={ index }>{ location.address }</p>;
		} );

		return (
			<div className={ props.className }>
				<h2>Block</h2>
				{ locationFields }
			</div>
		);
	},
} );
