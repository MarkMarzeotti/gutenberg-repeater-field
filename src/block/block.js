/**
 * BLOCK: gutenberg-repeater-field
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
registerBlockType( 'cgb/block-gutenberg-repeater-field', {
	title: __( 'gutenberg-repeater-field - CGB Block' ),
	icon: 'shield',
	category: 'common',
	attributes: {
		locations: {
			type: 'array',
			default: [],
		},
	},
	keywords: [
		__( 'gutenberg-repeater-field — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
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

		let markerFields,
			markerDisplay;

		if ( props.attributes.locations.length ) {
			markerFields = props.attributes.locations.map( ( location, index ) => {
				return <Fragment key={ index }>
					<TextControl
						className="advanced-maps-block__marker-address"
						placeholder="350 Fifth Avenue New York NY"
						value={ props.attributes.locations[ index ].address }
						onChange={ ( address ) => handleLocationChange( address, index ) }
					/>
					<IconButton
						className="advanced-maps-block__remove-marker-address"
						icon="no-alt"
						label="Delete Marker"
						onClick={ () => handleRemoveLocation( index ) }
					/>
				</Fragment>;
			} );

			markerDisplay = props.attributes.locations.map( ( location, index ) => {
				return <p key={ index }>{ location.address }</p>;
			} );
		}

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Locations' ) }>
					{ markerFields }
					<Button
						isDefault
						onClick={ handleAddLocation.bind( this ) }
					>
						{ __( 'Add Marker' ) }
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={ props.className }>
				<h2>Block</h2>
				{ markerDisplay }
			</div>,
		];
	},
	save: ( props ) => {
		const markerFields = props.attributes.locations.map( ( location, index ) => {
			return <p key={ index }>{ location.address }</p>;
		} );

		return (
			<div className={ props.className }>
				<h2>Block</h2>
				{ markerFields }
			</div>
		);
	},
} );
