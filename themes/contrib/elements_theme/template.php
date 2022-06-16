<?php

/**
* Return a themed set of links.
* An override of theme_links()
* Modified to use simple text styling instead of HTML & CSS
*
* @see theme_links
*/
function phptemplate_links($links, $attributes = array('class' => 'links')) {
  $output = '';


  // Change the way primary links are rendered
  if($attributes['class'] == 'links primary-links') {
    $linklist = array();
    $href = $link['href'] == "<front>" ? base_path() : base_path() . $link['href'];

    foreach ((array)$links as $key => $link) {
        $linklist[] = '<a href="'. $href .'"><span class="menu-items"><h3>'. $link['title'].'</h3>'.$link['attributes']['title'].'</span></a>';
    }
    // Return the links joined by a '|' character
    return join($linklist);
  }



  if (count($links) > 0) {
    $output = '<ol'. drupal_attributes($attributes) .'>';

    $num_links = count($links);
    $i = 1;

    foreach ($links as $key => $link) {
      $class = $key;

      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class .= ' first';
      }
      if ($i == $num_links) {
        $class .= ' last';
      }
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))) {
        $class .= ' active';
      }
      $output .= '<li'. drupal_attributes(array('class' => $class)) .'>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      else if (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span'. $span_attributes .'>'. $link['title'] .'</span>';
      }

      $i++;
      $output .= "</li>\n";
    }

    $output .= '</ol>';
  }

  return $output;
}