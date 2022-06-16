<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/contrib/dark_awesome/templates/page/page.html.twig */
class __TwigTemplate_6f268ac391f862e3c10807ff146a99bbc93744517ff1e144f5cadca026fdfb70 extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'main' => [$this, 'block_main'],
            'sidebar_first' => [$this, 'block_sidebar_first'],
            'content' => [$this, 'block_content'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 44
        echo "
<!-- Start: Header -->
<header class=\"header clear\">
    <div class=\"header-circle header-circle1\"></div>
    <div class=\"header-circle header-circle2\"></div>
    <div class=\"header-circle header-circle3\"></div>
    <div class=\"header-circle header-circle4\"></div>
    <div class=\"header-circle header-circle5\"></div>
    <div class=\"header-circle header-circle6\"></div>
    <div class=\"container header-main\">
        <div class=\"site-brand\">
            <div class=\"block-region region-site-branding\">
                <div id=\"block-dark-awesome-branding\" class=\"block\">
                    <div class=\"block-content\">
                        <div class=\"site-branding\">
                            ";
        // line 59
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "site_logo", [], "any", false, false, true, 59)) {
            // line 60
            echo "                            <div class=\"site-logo\">
                                ";
            // line 61
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "site_logo", [], "any", false, false, true, 61), 61, $this->source), "html", null, true);
            echo "
                            </div>
                            ";
        }
        // line 64
        echo "                        </div>
                    </div>
                </div>
                <!--/.block-content -->
            </div>
        </div>
        <!--/.site-branding -->
        <div class=\"header-main-right\">
            <div class=\"mobile-menu\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i></div>
            <div class=\"primary-menu-wrapper\">
                <div class=\"menu-wrap\">
                    <div class=\"close-mobile-menu\">x</div>
                    <div class=\"block-region region-primary-menu\">
                      ";
        // line 77
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_header", [], "any", false, false, true, 77)) {
            // line 78
            echo "                        <nav role=\"navigation\" aria-labelledby=\"block-dark-awesome-main-menu-menu\"
                            id=\"block-dark-awesome-main-menu\" class=\"block block-menu\">
                            <h2 class=\"visually-hidden block-title\" id=\"block-dark-awesome-main-menu-menu\">Main
                                navigation</h2>
                            ";
            // line 82
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_header", [], "any", false, false, true, 82), 82, $this->source), "html", null, true);
            echo "
                        </nav>
                      ";
        }
        // line 85
        echo "                    </div>
                </div> <!-- /.menu-wrap -->
            </div> <!-- /.primary-menu-wrapper -->
            <div class=\"full-page-search\">
                <div class=\"search-icon\">
                    <i class=\"fa fa-search\"></i>
                </div>
                <!--/.search icon -->
                <div class=\"search-box\">
                    <div class=\"search-box-close\"></div>
                    <div class=\"search-box-content\">
                        <div class=\"block-region region-search-box\">
                          ";
        // line 97
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "header_search", [], "any", false, false, true, 97)) {
            // line 98
            echo "                            <div class=\"search-block-form block\" data-drupal-selector=\"search-block-form\"
                                id=\"block-dark-awesome-search\" role=\"search\">
                                ";
            // line 100
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "header_search", [], "any", false, false, true, 100), 100, $this->source), "html", null, true);
            echo "
                            </div>
                          ";
        }
        // line 103
        echo "                            <!--/.block-content -->
                        </div>
                    </div>
                    <div class=\"search-box-close\"></div>
                </div> <!-- /.search-box -->
            </div>
            <!--/.full-page-search -->
        </div> <!-- /.header-right -->
    </div> <!-- /.container -->
  ";
        // line 112
        if (($context["slideshow_display"] ?? null)) {
            // line 113
            echo "    <section class=\"slider\">
        <div class=\"container slider-container\">
            <div class=\"slider-text\">
                <ul class=\"js-rotating\">
                  ";
            // line 117
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["slide"] ?? null));
            $context['loop'] = [
              'parent' => $context['_parent'],
              'index0' => 0,
              'index'  => 1,
              'first'  => true,
            ];
            if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
                $length = count($context['_seq']);
                $context['loop']['revindex0'] = $length - 1;
                $context['loop']['revindex'] = $length;
                $context['loop']['length'] = $length;
                $context['loop']['last'] = 1 === $length;
            }
            foreach ($context['_seq'] as $context["key"] => $context["option"]) {
                // line 118
                echo "                   ";
                if (twig_get_attribute($this->env, $this->source, $context["loop"], "first", [], "any", false, false, true, 118)) {
                    // line 119
                    echo "                    <li>
                       ";
                    // line 120
                    if (twig_get_attribute($this->env, $this->source, $context["option"], "slide_head", [], "any", false, false, true, 120)) {
                        // line 121
                        echo "                        <h1>";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_head", [], "any", false, false, true, 121), 121, $this->source), "html", null, true);
                        echo "</h1>
                       ";
                    }
                    // line 123
                    echo "                       ";
                    if (twig_get_attribute($this->env, $this->source, $context["option"], "slide_desc", [], "any", false, false, true, 123)) {
                        // line 124
                        echo "                        <p>";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_desc", [], "any", false, false, true, 124), 124, $this->source), "html", null, true);
                        echo "</p>
                       ";
                    }
                    // line 126
                    echo "                       ";
                    if ((twig_get_attribute($this->env, $this->source, $context["option"], "slide_url", [], "any", false, false, true, 126) || twig_get_attribute($this->env, $this->source, $context["option"], "slide_link_text", [], "any", false, false, true, 126))) {
                        // line 127
                        echo "                        <a class=\"button-link\" href=\"";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_url", [], "any", false, false, true, 127), 127, $this->source), "html", null, true);
                        echo "\">";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_link_text", [], "any", false, false, true, 127), 127, $this->source), "html", null, true);
                        echo "</a>
                       ";
                    }
                    // line 129
                    echo "                    </li>
                    ";
                } else {
                    // line 131
                    echo "                    <li>
                       ";
                    // line 132
                    if (twig_get_attribute($this->env, $this->source, $context["option"], "slide_head", [], "any", false, false, true, 132)) {
                        // line 133
                        echo "                        <h1>";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_head", [], "any", false, false, true, 133), 133, $this->source), "html", null, true);
                        echo "</h1>
                       ";
                    }
                    // line 135
                    echo "                       ";
                    if (twig_get_attribute($this->env, $this->source, $context["option"], "slide_desc", [], "any", false, false, true, 135)) {
                        // line 136
                        echo "                        <p>";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_desc", [], "any", false, false, true, 136), 136, $this->source), "html", null, true);
                        echo "</p>
                       ";
                    }
                    // line 138
                    echo "                       ";
                    if ((twig_get_attribute($this->env, $this->source, $context["option"], "slide_url", [], "any", false, false, true, 138) || twig_get_attribute($this->env, $this->source, $context["option"], "slide_link_text", [], "any", false, false, true, 138))) {
                        // line 139
                        echo "                        <a class=\"button-link\" href=\"";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_url", [], "any", false, false, true, 139), 139, $this->source), "html", null, true);
                        echo "\">";
                        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, $context["option"], "slide_link_text", [], "any", false, false, true, 139), 139, $this->source), "html", null, true);
                        echo "</a>
                       ";
                    }
                    // line 141
                    echo "                    </li>
                   ";
                }
                // line 143
                echo "                  ";
                ++$context['loop']['index0'];
                ++$context['loop']['index'];
                $context['loop']['first'] = false;
                if (isset($context['loop']['length'])) {
                    --$context['loop']['revindex0'];
                    --$context['loop']['revindex'];
                    $context['loop']['last'] = 0 === $context['loop']['revindex0'];
                }
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['option'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 144
            echo "                </ul>
                <!--/.home-slider -->
            </div><!-- /slider-text -->
           ";
            // line 147
            if (($context["show_header_image_details"] ?? null)) {
                // line 148
                echo "            <div class=\"slider-image\">
              ";
                // line 149
                if (($context["header_image"] ?? null)) {
                    // line 150
                    echo "                <img src=\"";
                    echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["header_image"] ?? null), 150, $this->source), "html", null, true);
                    echo "\" />
              ";
                }
                // line 152
                echo "            </div><!-- /slider-image -->
           ";
            }
            // line 154
            echo "        </div>
        <!--/.container -->
    </section>
  ";
        }
        // line 158
        echo "</header>


";
        // line 161
        $this->displayBlock('main', $context, $blocks);
        // line 189
        echo "<footer class=\"footer block-section clear\">
    <section id=\"footer-blocks\">
        <div class=\"container footer-container clear\">
           ";
        // line 192
        if (($context["show_footer_first_details"] ?? null)) {
            // line 193
            echo "            <div class=\"footer-block\">
                <div class=\"block-region region-footer-first\">
                    <div id=\"block-footerabout\" class=\"block\">
                        <div class=\"block-content\">
                            <div
                                class=\"field field--name-body field--type-text-with-summary field--label-hidden field-item\">
                              ";
            // line 199
            if (($context["footer_image"] ?? null)) {
                // line 200
                echo "                                <img src=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["footer_image"] ?? null), 200, $this->source), "html", null, true);
                echo "\" />
                              ";
            }
            // line 202
            echo "                              ";
            if (($context["footer_text"] ?? null)) {
                // line 203
                echo "                                <p>";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["footer_text"] ?? null), 203, $this->source), "html", null, true);
                echo "</p>
                              ";
            }
            // line 205
            echo "                            </div>
                        </div>
                    </div>
                    <!--/.block-content -->
                </div>
            </div>
           ";
        }
        // line 212
        echo "            <!--/footer-first -->
            <div class=\"footer-block\">
                <div class=\"block-region region-footer-second\">
                  ";
        // line 215
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_second", [], "any", false, false, true, 215)) {
            // line 216
            echo "                    <div id=\"block-footersupport\" class=\"block\">
                        ";
            // line 217
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_second", [], "any", false, false, true, 217), 217, $this->source), "html", null, true);
            echo "
                    </div>
                  ";
        }
        // line 220
        echo "                    <!--/.block-content -->
                </div>
            </div>
            <!--/footer-second -->

            <div class=\"footer-block\">
                <div class=\"block-region region-footer-third\">
                  ";
        // line 227
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_third", [], "any", false, false, true, 227)) {
            // line 228
            echo "                    <div id=\"block-usefullinks\" class=\"block\">
                        ";
            // line 229
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_third", [], "any", false, false, true, 229), 229, $this->source), "html", null, true);
            echo "
                    </div>
                  ";
        }
        // line 232
        echo "                    <!--/.block-content -->
                </div>
            </div>
            <!--/footer-three -->
          ";
        // line 236
        if (($context["show_contact_details"] ?? null)) {
            // line 237
            echo "            <div class=\"footer-block last-footer-block\">
                <div class=\"block-region region-footer-fourth\">
                    <div id=\"block-footercontactus\" class=\"block\">
                      ";
            // line 240
            if (($context["footer_contact"] ?? null)) {
                // line 241
                echo "                        <h2 class=\"block-title\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["footer_contact"] ?? null), 241, $this->source), "html", null, true);
                echo "</h2>
                      ";
            }
            // line 243
            echo "                        <div class=\"block-content\">
                            <div
                                class=\"field field--name-body field--type-text-with-summary field--label-hidden field-item\">
                              ";
            // line 246
            if (($context["location"] ?? null)) {
                // line 247
                echo "                                <p><i class=\"fa fa-map-marker theme-color\" aria-hidden=\"true\"></i>";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["location"] ?? null), 247, $this->source), "html", null, true);
                echo "</p>
                              ";
            }
            // line 249
            echo "                              ";
            if (($context["phone"] ?? null)) {
                // line 250
                echo "                                <p><i class=\"fa fa-mobile theme-color\" aria-hidden=\"true\"></i>";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["phone"] ?? null), 250, $this->source), "html", null, true);
                echo "</p>
                              ";
            }
            // line 252
            echo "                              ";
            if (($context["emails"] ?? null)) {
                // line 253
                echo "                                <p><i class=\"fa fa-envelope-o theme-color\" aria-hidden=\"true\"></i>";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["emails"] ?? null), 253, $this->source), "html", null, true);
                echo "</p>
                              ";
            }
            // line 255
            echo "                            </div>
                        </div>
                    </div>
                    <!--/.block-content -->
                </div>
            </div>
          ";
        }
        // line 262
        echo "            <!--/footer-fourth -->
        </div>
        <!--/container -->
    </section>
    <!--/footer-blocks -->

    <!-- /footer-bottom -->
    <section id=\"footer-bottom-last\">
        <div class=\"footer-bottom-last container clear\">
          ";
        // line 271
        if (($context["footer_copyright"] ?? null)) {
            // line 272
            echo "            <div class=\"copyright\">
                ";
            // line 273
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["footer_copyright"] ?? null), 273, $this->source), "html", null, true);
            echo "
            </div>
          ";
        }
        // line 276
        echo "          ";
        if (($context["show_social_icon"] ?? null)) {
            // line 277
            echo "            <div class=\"footer-social-icons\">
                <ul class=\"social-icons\">
                  ";
            // line 279
            if (($context["facebook_url"] ?? null)) {
                // line 280
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["facebook_url"] ?? null), 280, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-facebook\" aria-hidden=\"true\"></i></a>
                    </li>
                  ";
            }
            // line 283
            echo "                  ";
            if (($context["twitter_url"] ?? null)) {
                // line 284
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["twitter_url"] ?? null), 284, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-twitter\" aria-hidden=\"true\"></i></a>
                    </li>
                  ";
            }
            // line 287
            echo "                  ";
            if (($context["instagram_url"] ?? null)) {
                // line 288
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["instagram_url"] ?? null), 288, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-instagram\"></i></a></li>
                  ";
            }
            // line 290
            echo "                  ";
            if (($context["linkedin_url"] ?? null)) {
                // line 291
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["linkedin_url"] ?? null), 291, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-linkedin\"></i></a></li>
                  ";
            }
            // line 293
            echo "                  ";
            if (($context["youtube_url"] ?? null)) {
                // line 294
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["youtube_url"] ?? null), 294, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-youtube\"></i></a></li>
                  ";
            }
            // line 296
            echo "                  ";
            if (($context["vimeo_url"] ?? null)) {
                // line 297
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["vimeo_url"] ?? null), 297, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-vimeo\"></i></a></li>
                  ";
            }
            // line 299
            echo "                  ";
            if (($context["telegram_url"] ?? null)) {
                // line 300
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["telegram_url"] ?? null), 300, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-telegram\"></i></a></li>
                  ";
            }
            // line 302
            echo "                  ";
            if (($context["whatsapp_url"] ?? null)) {
                // line 303
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["whatsapp_url"] ?? null), 303, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-whatsapp\"></i></a></li>
                  ";
            }
            // line 305
            echo "                  ";
            if (($context["github_url"] ?? null)) {
                // line 306
                echo "                    <li><a href=\"";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["github_url"] ?? null), 306, $this->source), "html", null, true);
                echo "\" target=\"_blank\"><i class=\"fa fa-github\"></i></a></li>
                  ";
            }
            // line 308
            echo "                </ul>
            </div>
          ";
        }
        // line 311
        echo "        </div>
        <!--/.text_right -->
        </div> <!-- /.container -->
    </section> <!-- /footer-bottom-last -->
    <!-- end condition if copyright or social icons -->
</footer>
  ";
        // line 317
        if (($context["show_scroller_details"] ?? null)) {
            // line 318
            echo "    <div class=\"scrolltop  arrow-up ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["arrow_up"] ?? null), 318, $this->source), "html", null, true);
            echo "\">
        <div class=\"scrolltop-icon\">&#x2191;</div>
    </div>
  ";
        }
        // line 322
        echo "<!-- End: Footer -->";
    }

    // line 161
    public function block_main($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 162
        echo "  <div class=\"container\">
    <div class=\"row main-show\">
      ";
        // line 165
        echo "      ";
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 165)) {
            // line 166
            echo "        ";
            $this->displayBlock('sidebar_first', $context, $blocks);
            // line 171
            echo "      ";
        }
        // line 172
        echo " 
      ";
        // line 174
        $context["content_classes"] = [0 => ((twig_get_attribute($this->env, $this->source,         // line 175
($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 175)) ? ("with-sidefirst") : ("")), 1 => ((twig_test_empty(twig_get_attribute($this->env, $this->source,         // line 176
($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 176))) ? ("main-area") : (""))];
        // line 179
        echo "      <div";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["content_attributes"] ?? null), "addClass", [0 => ($context["content_classes"] ?? null)], "method", false, false, true, 179), 179, $this->source), "html", null, true);
        echo ">
        ";
        // line 181
        echo "        ";
        $this->displayBlock('content', $context, $blocks);
        // line 185
        echo "      </div>
    </div>
  </div>
";
    }

    // line 166
    public function block_sidebar_first($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 167
        echo "          <div class=\"sidefirst\">
            ";
        // line 168
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 168), 168, $this->source), "html", null, true);
        echo "
          </div>
        ";
    }

    // line 181
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 182
        echo "          <a id=\"main-content\"></a>
          ";
        // line 183
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 183), 183, $this->source), "html", null, true);
        echo "
        ";
    }

    public function getTemplateName()
    {
        return "themes/contrib/dark_awesome/templates/page/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  619 => 183,  616 => 182,  612 => 181,  605 => 168,  602 => 167,  598 => 166,  591 => 185,  588 => 181,  583 => 179,  581 => 176,  580 => 175,  579 => 174,  576 => 172,  573 => 171,  570 => 166,  567 => 165,  563 => 162,  559 => 161,  555 => 322,  547 => 318,  545 => 317,  537 => 311,  532 => 308,  526 => 306,  523 => 305,  517 => 303,  514 => 302,  508 => 300,  505 => 299,  499 => 297,  496 => 296,  490 => 294,  487 => 293,  481 => 291,  478 => 290,  472 => 288,  469 => 287,  462 => 284,  459 => 283,  452 => 280,  450 => 279,  446 => 277,  443 => 276,  437 => 273,  434 => 272,  432 => 271,  421 => 262,  412 => 255,  406 => 253,  403 => 252,  397 => 250,  394 => 249,  388 => 247,  386 => 246,  381 => 243,  375 => 241,  373 => 240,  368 => 237,  366 => 236,  360 => 232,  354 => 229,  351 => 228,  349 => 227,  340 => 220,  334 => 217,  331 => 216,  329 => 215,  324 => 212,  315 => 205,  309 => 203,  306 => 202,  300 => 200,  298 => 199,  290 => 193,  288 => 192,  283 => 189,  281 => 161,  276 => 158,  270 => 154,  266 => 152,  260 => 150,  258 => 149,  255 => 148,  253 => 147,  248 => 144,  234 => 143,  230 => 141,  222 => 139,  219 => 138,  213 => 136,  210 => 135,  204 => 133,  202 => 132,  199 => 131,  195 => 129,  187 => 127,  184 => 126,  178 => 124,  175 => 123,  169 => 121,  167 => 120,  164 => 119,  161 => 118,  144 => 117,  138 => 113,  136 => 112,  125 => 103,  119 => 100,  115 => 98,  113 => 97,  99 => 85,  93 => 82,  87 => 78,  85 => 77,  70 => 64,  64 => 61,  61 => 60,  59 => 59,  42 => 44,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/dark_awesome/templates/page/page.html.twig", "/app/themes/contrib/dark_awesome/templates/page/page.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 59, "for" => 117, "block" => 161, "set" => 174);
        static $filters = array("escape" => 61);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for', 'block', 'set'],
                ['escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
