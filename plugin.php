<?php
/**
 * Plugin Name: Gutenberg Repeater Field
 * Plugin URI: https://github.com/MarkMarzeotti/gutenberg-repeater-field
 * Description: This plugin does not have any real functionality. It shows how one might create a repeatable field inside a Gutenberg block.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
