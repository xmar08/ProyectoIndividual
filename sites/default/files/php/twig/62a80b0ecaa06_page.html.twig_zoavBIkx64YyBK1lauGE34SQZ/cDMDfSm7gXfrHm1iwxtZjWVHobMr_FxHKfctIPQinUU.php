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

/* themes/contrib/photographer/templates/page.html.twig */
class __TwigTemplate_e07e7bf4749ffcc2588cbfaf4d3397cf240521d2259ff2709de9ab4229e75ede extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<a name=\"Top\" id=\"Top\"></a>
<div id=\"color\" class=\"default\">
  <div id=\"page\">
      <div id=\"dynamicPanel\" >
        <div class=\"container\">
          <div class=\"row\">
            <div class=\"staticPanel\">
              <div class=\"top_header col-lg-4 col-md-4 col-sm-4 col-xs-12\">
                ";
        // line 9
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "header", [], "any", false, false, true, 9), 9, $this->source), "html", null, true);
        echo "
              </div>

              ";
        // line 12
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "primary_menu", [], "any", false, false, true, 12)) {
            // line 13
            echo "                <nav id=\"site-navigation\" class=\"navbar navbar-default col-lg-8 col-md-8 col-sm-8 col-xs-12\" role=\"navigation\">
                    <div class=\"navbar-header\">
                        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#main-navbar-collapse\">
                           <i class=\"fa fa-bars\"></i>
                         </button>
                        <div id=\"main-navbar-collapse\" class=\"navbar-collapse collapse\">
                            ";
            // line 19
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "primary_menu", [], "any", false, false, true, 19), 19, $this->source), "html", null, true);
            echo "
                        </div>
                    </div>
                </nav><!-- #site-navigation -->
              ";
        }
        // line 24
        echo "
            </div>

            ";
        // line 27
        if (($context["secondary_menu"] ?? null)) {
            // line 28
            echo "              <div class=\"col-lg-8\">
                <nav id=\"navigation\" class=\"navigation\" role=\"navigation\">
                  <div class=\"container\">
                    ";
            // line 31
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["secondary_menu"] ?? null), 31, $this->source), "html", null, true);
            echo "
                  </div>
                </nav>
              </div>  
            ";
        }
        // line 36
        echo "
            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#main-menu-inner\">
              <span class=\"sr-only\">Toggle navigation</span>
              <span class=\"icon-bar\"></span>
              <span class=\"icon-bar\"></span>
              <span class=\"icon-bar\"></span>
            </button>

          </div>
        </div>
      </div>
      ";
        // line 47
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "main_title", [], "any", false, false, true, 47), 47, $this->source), "html", null, true);
        echo "


      <div class=\"video_block\">
      <div class=\"container\">

        <div id=\"myModal\" class=\"modal fade\" role=\"dialog\">
        <div class=\"modal-dialog\">
          <!-- Modal content-->
          <div class=\"modal-content\">
            <div class=\"modal-header\">
              <div type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</div>
              ";
        // line 59
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "video", [], "any", false, false, true, 59), 59, $this->source), "html", null, true);
        echo "
            </div>
            <div class=\"modal-footer\">
              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class=\"play\">
        <div id=\"play\"></div>
      <div class=\"border_button\">
        <div type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">
        </div>
      </div>
      </div>


      ";
        // line 76
        if (($context["show_hide_icon"] ?? null)) {
            // line 77
            echo "              <div class=\"socBox col-lg-12\">
                <ul class=\"socIcons\">
                    ";
            // line 79
            $context["soc"] = ["twitter" =>             // line 80
($context["twitter"] ?? null), "facebook" =>             // line 81
($context["facebook"] ?? null), "flickr" =>             // line 82
($context["flickr"] ?? null), "linkedin" =>             // line 83
($context["linkedin"] ?? null), "play" =>             // line 84
($context["youtube"] ?? null), "pinterest" =>             // line 85
($context["pinterest"] ?? null), "google-plus" =>             // line 86
($context["google"] ?? null), "dribbble" =>             // line 87
($context["dribbble"] ?? null), "vimeo-square" =>             // line 88
($context["vimeo"] ?? null), "instagram" =>             // line 89
($context["instagram"] ?? null), "vk" =>             // line 90
($context["vk"] ?? null)];
            // line 92
            echo "                     ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["soc"] ?? null));
            foreach ($context['_seq'] as $context["key"] => $context["value"]) {
                // line 93
                echo "                        ";
                if ($context["value"]) {
                    // line 94
                    echo "                          <li>
                              <a href=\"";
                    // line 95
                    echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($context["value"], 95, $this->source), "html", null, true);
                    echo "\" target=\"_blank\">
                                  <i class=\"fa fa-";
                    // line 96
                    echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($context["key"], 96, $this->source), "html", null, true);
                    echo "\"></i>";
                    echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($context["key"], 96, $this->source), "html", null, true);
                    echo "
                              </a>
                          </li>
                        ";
                }
                // line 100
                echo "                      ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['value'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 101
            echo "                  </ul>
                </div>
              ";
        }
        // line 104
        echo "

      ";
        // line 106
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "social_icon", [], "any", false, false, true, 106)) {
            // line 107
            echo "        <section id=\"social_icon_top\" class=\"social_icon\">
          <div class=\"\">
            ";
            // line 109
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "social_icon", [], "any", false, false, true, 109), 109, $this->source), "html", null, true);
            echo "
          </div>
        </section>
      ";
        }
        // line 113
        echo "
        <!-- <div class=\"vid_bg\">
          <a id=\"play\" class=\"fancybox\" rel=\"group\" href=\"#video\"></a>
          </div>
          <div style=\"display: none;\">
            
              <div id=\"video\">
                
                
              </div>
              
            
          </div> -->
        
      </div>
    </div>
  </div>

<div class=\"wrapper\">
";
        // line 132
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "slideshow", [], "any", false, false, true, 132)) {
            // line 133
            echo "  <section id=\"slideshow\" class=\"slideshow\">
    <div class=\"\">
      ";
            // line 135
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "slideshow", [], "any", false, false, true, 135), 135, $this->source), "html", null, true);
            echo "
    </div>
  </section>
";
        }
        // line 139
        echo "

    

";
        // line 143
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top1", [], "any", false, false, true, 143) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 143)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 143)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 143))) {
            // line 144
            echo "<div id=\"page1\">
  <div class=\"container\">
    <div class=\"row\">
      ";
            // line 147
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top1", [], "any", false, false, true, 147)) {
                // line 148
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 148) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 148)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 148))) {
                    // line 149
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 150
($context["page"] ?? null), "top2", [], "any", false, false, true, 150) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 150))) {
                    // line 151
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 152
($context["page"] ?? null), "top2", [], "any", false, false, true, 152) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 152))) {
                    // line 153
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 154
($context["page"] ?? null), "top3", [], "any", false, false, true, 154) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 154))) {
                    // line 155
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 156
($context["page"] ?? null), "top2", [], "any", false, false, true, 156) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 156)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 156))) {
                    // line 157
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 159
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 161
                echo "          <div class=\"top1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top1", [], "any", false, false, true, 161), 161, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 164
            echo "</div>
      ";
            // line 165
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 165)) {
                // line 166
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top1", [], "any", false, false, true, 166) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 166)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 166))) {
                    // line 167
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 168
($context["page"] ?? null), "top1", [], "any", false, false, true, 168) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 168))) {
                    // line 169
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 170
($context["page"] ?? null), "top1", [], "any", false, false, true, 170) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 170))) {
                    // line 171
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 172
($context["page"] ?? null), "top3", [], "any", false, false, true, 172) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 172))) {
                    // line 173
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 174
($context["page"] ?? null), "top1", [], "any", false, false, true, 174) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 174)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 174))) {
                    // line 175
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 177
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 179
                echo "          <div class=\"top2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 179), 179, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 182
            echo "
      ";
            // line 183
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 183)) {
                // line 184
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top1", [], "any", false, false, true, 184) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 184)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 184))) {
                    // line 185
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 186
($context["page"] ?? null), "top1", [], "any", false, false, true, 186) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 186))) {
                    // line 187
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 188
($context["page"] ?? null), "top1", [], "any", false, false, true, 188) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 188))) {
                    // line 189
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 190
($context["page"] ?? null), "top2", [], "any", false, false, true, 190) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 190))) {
                    // line 191
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 192
($context["page"] ?? null), "top1", [], "any", false, false, true, 192) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 192)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 192))) {
                    // line 193
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 195
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 197
                echo "          <div class=\"top3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 197), 197, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 200
            echo "
      ";
            // line 201
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 201)) {
                // line 202
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top1", [], "any", false, false, true, 202) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 202)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 202))) {
                    // line 203
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 204
($context["page"] ?? null), "top1", [], "any", false, false, true, 204) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 204))) {
                    // line 205
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 206
($context["page"] ?? null), "top1", [], "any", false, false, true, 206) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 206))) {
                    // line 207
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 208
($context["page"] ?? null), "top2", [], "any", false, false, true, 208) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 208))) {
                    // line 209
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 210
($context["page"] ?? null), "top1", [], "any", false, false, true, 210) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top2", [], "any", false, false, true, 210)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top3", [], "any", false, false, true, 210))) {
                    // line 211
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 213
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 215
                echo "          <div class=\"top4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top4", [], "any", false, false, true, 215), 215, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 218
            echo "
    </div>
  </div>
";
        }
        // line 222
        echo "
";
        // line 223
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content1", [], "any", false, false, true, 223) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 223)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 223)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 223))) {
            // line 224
            echo "  <div id=\"page2\">
    <div class=\"row\">
      ";
            // line 226
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content1", [], "any", false, false, true, 226)) {
                // line 227
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 227) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 227)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 227))) {
                    // line 228
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 229
($context["page"] ?? null), "top_content2", [], "any", false, false, true, 229) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 229))) {
                    // line 230
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 231
($context["page"] ?? null), "top_content2", [], "any", false, false, true, 231) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 231))) {
                    // line 232
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 233
($context["page"] ?? null), "top_content3", [], "any", false, false, true, 233) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 233))) {
                    // line 234
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 235
($context["page"] ?? null), "top_content2", [], "any", false, false, true, 235) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 235)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 235))) {
                    // line 236
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 238
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 240
                echo "          <div class=\"top_content1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content1", [], "any", false, false, true, 240), 240, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 243
            echo "
      ";
            // line 244
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 244)) {
                // line 245
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content1", [], "any", false, false, true, 245) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 245)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 245))) {
                    // line 246
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 247
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 247) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 247))) {
                    // line 248
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 249
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 249) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 249))) {
                    // line 250
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 251
($context["page"] ?? null), "top_content3", [], "any", false, false, true, 251) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 251))) {
                    // line 252
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 253
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 253) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 253)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 253))) {
                    // line 254
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 256
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 258
                echo "          <div class=\"top_content2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 258), 258, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 260
            echo "  

      ";
            // line 262
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 262)) {
                // line 263
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content1", [], "any", false, false, true, 263) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 263)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 263))) {
                    // line 264
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 265
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 265) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 265))) {
                    // line 266
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 267
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 267) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 267))) {
                    // line 268
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 269
($context["page"] ?? null), "top_content2", [], "any", false, false, true, 269) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 269))) {
                    // line 270
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 271
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 271) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 271)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 271))) {
                    // line 272
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 274
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 276
                echo "          <div class=\"top_content3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 276), 276, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 279
            echo "
      ";
            // line 280
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 280)) {
                // line 281
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content1", [], "any", false, false, true, 281) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 281)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 281))) {
                    // line 282
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 283
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 283) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 283))) {
                    // line 284
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 285
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 285) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 285))) {
                    // line 286
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 287
($context["page"] ?? null), "top_content2", [], "any", false, false, true, 287) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 287))) {
                    // line 288
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 289
($context["page"] ?? null), "top_content1", [], "any", false, false, true, 289) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content2", [], "any", false, false, true, 289)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content3", [], "any", false, false, true, 289))) {
                    // line 290
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 292
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 294
                echo "          <div class=\"top4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content4", [], "any", false, false, true, 294), 294, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 297
            echo "
    </div>
  </div>
";
        }
        // line 301
        echo "
";
        // line 302
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line1", [], "any", false, false, true, 302) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 302)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 302)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 302))) {
            // line 303
            echo "<div id=\"page3\">
  <div class=\"container\">
    <div class=\"row\">
      ";
            // line 306
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line1", [], "any", false, false, true, 306)) {
                // line 307
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 307) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 307)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 307))) {
                    // line 308
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 309
($context["page"] ?? null), "line2", [], "any", false, false, true, 309) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 309))) {
                    // line 310
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 311
($context["page"] ?? null), "line2", [], "any", false, false, true, 311) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 311))) {
                    // line 312
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 313
($context["page"] ?? null), "line3", [], "any", false, false, true, 313) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 313))) {
                    // line 314
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 315
($context["page"] ?? null), "line2", [], "any", false, false, true, 315) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 315)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 315))) {
                    // line 316
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 318
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 320
                echo "          <div class=\"line1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line1", [], "any", false, false, true, 320), 320, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 323
            echo "</div>
      ";
            // line 324
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 324)) {
                // line 325
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line1", [], "any", false, false, true, 325) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 325)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 325))) {
                    // line 326
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 327
($context["page"] ?? null), "line1", [], "any", false, false, true, 327) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 327))) {
                    // line 328
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 329
($context["page"] ?? null), "line1", [], "any", false, false, true, 329) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 329))) {
                    // line 330
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 331
($context["page"] ?? null), "line3", [], "any", false, false, true, 331) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 331))) {
                    // line 332
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 333
($context["page"] ?? null), "line1", [], "any", false, false, true, 333) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 333)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 333))) {
                    // line 334
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 336
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 338
                echo "          <div class=\"line2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 338), 338, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 340
            echo "  

      ";
            // line 342
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 342)) {
                // line 343
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line1", [], "any", false, false, true, 343) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 343)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 343))) {
                    // line 344
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 345
($context["page"] ?? null), "line1", [], "any", false, false, true, 345) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 345))) {
                    // line 346
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 347
($context["page"] ?? null), "line1", [], "any", false, false, true, 347) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 347))) {
                    // line 348
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 349
($context["page"] ?? null), "line2", [], "any", false, false, true, 349) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 349))) {
                    // line 350
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 351
($context["page"] ?? null), "line1", [], "any", false, false, true, 351) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 351)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 351))) {
                    // line 352
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 354
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 356
                echo "          <div class=\"line3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 356), 356, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 359
            echo "
      ";
            // line 360
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 360)) {
                // line 361
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line1", [], "any", false, false, true, 361) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 361)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 361))) {
                    // line 362
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 363
($context["page"] ?? null), "line1", [], "any", false, false, true, 363) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 363))) {
                    // line 364
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 365
($context["page"] ?? null), "line1", [], "any", false, false, true, 365) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 365))) {
                    // line 366
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 367
($context["page"] ?? null), "line2", [], "any", false, false, true, 367) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 367))) {
                    // line 368
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 369
($context["page"] ?? null), "line1", [], "any", false, false, true, 369) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line2", [], "any", false, false, true, 369)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line3", [], "any", false, false, true, 369))) {
                    // line 370
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 372
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 374
                echo "          <div class=\"line4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "line4", [], "any", false, false, true, 374), 374, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 377
            echo "
    </div>
  </div>
";
        }
        // line 381
        echo "
";
        // line 382
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content", [], "any", false, false, true, 382)) {
            // line 383
            echo "  <div class=\"container\">
    <div class=\"row\">
      <div class=\"col-lg-12\">
        ";
            // line 386
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "top_content", [], "any", false, false, true, 386), 386, $this->source), "html", null, true);
            echo "
      </div>
    </div>
  </div>
";
        }
        // line 391
        echo "
";
        // line 392
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature1", [], "any", false, false, true, 392) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 392)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 392)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 392))) {
            // line 393
            echo "<div id=\"page4\">
  <div class=\"container\">
    <div class=\"row\">
      ";
            // line 396
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature1", [], "any", false, false, true, 396)) {
                // line 397
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 397) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 397)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 397))) {
                    // line 398
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 399
($context["page"] ?? null), "feature2", [], "any", false, false, true, 399) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 399))) {
                    // line 400
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 401
($context["page"] ?? null), "feature2", [], "any", false, false, true, 401) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 401))) {
                    // line 402
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 403
($context["page"] ?? null), "feature3", [], "any", false, false, true, 403) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 403))) {
                    // line 404
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 405
($context["page"] ?? null), "feature2", [], "any", false, false, true, 405) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 405)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 405))) {
                    // line 406
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 408
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 410
                echo "          <div class=\"feature1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature1", [], "any", false, false, true, 410), 410, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 413
            echo "</div>
      ";
            // line 414
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 414)) {
                // line 415
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature1", [], "any", false, false, true, 415) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 415)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 415))) {
                    // line 416
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 417
($context["page"] ?? null), "feature1", [], "any", false, false, true, 417) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 417))) {
                    // line 418
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 419
($context["page"] ?? null), "feature1", [], "any", false, false, true, 419) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 419))) {
                    // line 420
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 421
($context["page"] ?? null), "feature3", [], "any", false, false, true, 421) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 421))) {
                    // line 422
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 423
($context["page"] ?? null), "feature1", [], "any", false, false, true, 423) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 423)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 423))) {
                    // line 424
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 426
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 428
                echo "          <div class=\"feature2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 428), 428, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 431
            echo "
      ";
            // line 432
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 432)) {
                // line 433
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature1", [], "any", false, false, true, 433) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 433)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 433))) {
                    // line 434
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 435
($context["page"] ?? null), "feature1", [], "any", false, false, true, 435) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 435))) {
                    // line 436
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 437
($context["page"] ?? null), "feature1", [], "any", false, false, true, 437) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 437))) {
                    // line 438
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 439
($context["page"] ?? null), "feature2", [], "any", false, false, true, 439) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 439))) {
                    // line 440
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 441
($context["page"] ?? null), "feature1", [], "any", false, false, true, 441) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 441)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 441))) {
                    // line 442
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 444
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 446
                echo "          <div class=\"feature3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 446), 446, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 449
            echo "
      ";
            // line 450
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 450)) {
                // line 451
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature1", [], "any", false, false, true, 451) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 451)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 451))) {
                    // line 452
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 453
($context["page"] ?? null), "feature1", [], "any", false, false, true, 453) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 453))) {
                    // line 454
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 455
($context["page"] ?? null), "feature1", [], "any", false, false, true, 455) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 455))) {
                    // line 456
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 457
($context["page"] ?? null), "feature2", [], "any", false, false, true, 457) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 457))) {
                    // line 458
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 459
($context["page"] ?? null), "feature1", [], "any", false, false, true, 459) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature2", [], "any", false, false, true, 459)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature3", [], "any", false, false, true, 459))) {
                    // line 460
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 462
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 464
                echo "          <div class=\"feature4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "feature4", [], "any", false, false, true, 464), 464, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 467
            echo "
    </div>
  </div>
";
        }
        // line 471
        echo "
";
        // line 472
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 472) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 472)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 472)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 472))) {
            // line 473
            echo "<div id=\"page5\">
  <div class=\"container\">
    <div class=\"row\">
      ";
            // line 476
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 476)) {
                // line 477
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 477) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 477)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 477))) {
                    // line 478
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 479
($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 479) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 479))) {
                    // line 480
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 481
($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 481) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 481))) {
                    // line 482
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 483
($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 483) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 483))) {
                    // line 484
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 485
($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 485) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 485)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 485))) {
                    // line 486
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 488
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 490
                echo "          <div class=\"contenttop1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 490), 490, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 493
            echo "</div>
      ";
            // line 494
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 494)) {
                // line 495
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 495) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 495)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 495))) {
                    // line 496
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 497
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 497) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 497))) {
                    // line 498
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 499
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 499) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 499))) {
                    // line 500
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 501
($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 501) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 501))) {
                    // line 502
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 503
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 503) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 503)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 503))) {
                    // line 504
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 506
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 508
                echo "          <div class=\"contenttop2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 508), 508, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 511
            echo "
      ";
            // line 512
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 512)) {
                // line 513
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 513) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 513)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 513))) {
                    // line 514
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 515
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 515) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 515))) {
                    // line 516
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 517
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 517) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 517))) {
                    // line 518
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 519
($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 519) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 519))) {
                    // line 520
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 521
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 521) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 521)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 521))) {
                    // line 522
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 524
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 526
                echo "          <div class=\"contenttop3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 526), 526, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 529
            echo "
      ";
            // line 530
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 530)) {
                // line 531
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 531) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 531)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 531))) {
                    // line 532
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 533
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 533) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 533))) {
                    // line 534
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 535
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 535) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 535))) {
                    // line 536
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 537
($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 537) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 537))) {
                    // line 538
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 539
($context["page"] ?? null), "contenttop1", [], "any", false, false, true, 539) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop2", [], "any", false, false, true, 539)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop3", [], "any", false, false, true, 539))) {
                    // line 540
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 542
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 544
                echo "          <div class=\"contenttop4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contenttop4", [], "any", false, false, true, 544), 544, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 547
            echo "
    </div>
  </div>
";
        }
        // line 551
        echo "
 


  
    <a id=\"main-content\"></a>
    <div id=\"content\">
    <div class=\"container\">
      <div class=\"row\">
        ";
        // line 560
        if (($context["front_page"] ?? null)) {
            // line 561
            echo "
            ";
            // line 562
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 562)) {
                // line 563
                echo "              <div class=\"sidebar-first sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12\" role=\"complementary\">
                ";
                // line 564
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 564), 564, $this->source), "html", null, true);
                echo "
              </div>
            ";
            }
            // line 567
            echo "        
            <div class=\"content col-lg-";
            // line 568
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "main_content_width", [], "any", false, false, true, 568), 568, $this->source), "html", null, true);
            echo " col-md-";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "main_content_width", [], "any", false, false, true, 568), 568, $this->source), "html", null, true);
            echo " col-sm-12 col-xs-12\">
              ";
            // line 569
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "highlighted", [], "any", false, false, true, 569), 569, $this->source), "html", null, true);
            echo "

              ";
            // line 571
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null), 571, $this->source), "html", null, true);
            echo "
              ";
            // line 572
            if (($context["title"] ?? null)) {
                // line 573
                echo "                <h4>";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title"] ?? null), 573, $this->source), "html", null, true);
                echo "</h4>
              ";
            }
            // line 575
            echo "              ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null), 575, $this->source), "html", null, true);
            echo "

              ";
            // line 577
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["tabs"] ?? null), 577, $this->source), "html", null, true);
            echo "

              ";
            // line 579
            if (($context["action_links"] ?? null)) {
                // line 580
                echo "                <nav class=\"action-links\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["action_links"] ?? null), 580, $this->source), "html", null, true);
                echo "</nav>
              ";
            }
            // line 582
            echo "
              ";
            // line 583
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 583), 583, $this->source), "html", null, true);
            echo "
              ";
            // line 584
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["feed_icons"] ?? null), 584, $this->source), "html", null, true);
            echo "
            </div>

            ";
            // line 587
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_second", [], "any", false, false, true, 587)) {
                // line 588
                echo "              <aside class=\"sidebar-second sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12\" role=\"complementary\">
                ";
                // line 589
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_second", [], "any", false, false, true, 589), 589, $this->source), "html", null, true);
                echo "
              </aside>
            ";
            }
            // line 592
            echo "
        ";
        } else {
            // line 594
            echo "
          ";
            // line 595
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 595)) {
                // line 596
                echo "            <div class=\"sidebar-first sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12\" role=\"complementary\">
              ";
                // line 597
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_first", [], "any", false, false, true, 597), 597, $this->source), "html", null, true);
                echo "
            </div>
          ";
            }
            // line 600
            echo "    
          <div class=\"content col-lg-";
            // line 601
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "main_content_width", [], "any", false, false, true, 601), 601, $this->source), "html", null, true);
            echo " col-md-";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "main_content_width", [], "any", false, false, true, 601), 601, $this->source), "html", null, true);
            echo " col-sm-12 col-xs-12\">
            ";
            // line 602
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "highlighted", [], "any", false, false, true, 602), 602, $this->source), "html", null, true);
            echo "

            ";
            // line 604
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["tabs"] ?? null), 604, $this->source), "html", null, true);
            echo "

             ";
            // line 606
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null), 606, $this->source), "html", null, true);
            echo "
              ";
            // line 607
            if (($context["title"] ?? null)) {
                // line 608
                echo "                <h2>";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title"] ?? null), 608, $this->source), "html", null, true);
                echo "</h2>
              ";
            }
            // line 610
            echo "              ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null), 610, $this->source), "html", null, true);
            echo "

            ";
            // line 612
            if (($context["action_links"] ?? null)) {
                // line 613
                echo "              <nav class=\"action-links\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["action_links"] ?? null), 613, $this->source), "html", null, true);
                echo "</nav>
            ";
            }
            // line 615
            echo "            <div class=\"test_class\">
            ";
            // line 616
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 616), 616, $this->source), "html", null, true);
            echo "
            </div>
            ";
            // line 618
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["feed_icons"] ?? null), 618, $this->source), "html", null, true);
            echo "
          </div>

          ";
            // line 621
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_second", [], "any", false, false, true, 621)) {
                // line 622
                echo "            <aside class=\"sidebar-second sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12\" role=\"complementary\">
              ";
                // line 623
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "sidebar_second", [], "any", false, false, true, 623), 623, $this->source), "html", null, true);
                echo "
            </aside>
          ";
            }
            // line 626
            echo "        ";
        }
        echo "     
      </div>
    </div>
    </div>

  ";
        // line 631
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "featured", [], "any", false, false, true, 631)) {
            // line 632
            echo "    <section id=\"featured\" class=\"featured\">
      <div class=\"container\">
        ";
            // line 634
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "featured", [], "any", false, false, true, 634), 634, $this->source), "html", null, true);
            echo "
      </div>
    </section>
  ";
        }
        // line 638
        echo "
  ";
        // line 639
        if (($context["messages"] ?? null)) {
            // line 640
            echo "    <section id=\"messages\" class=\"messages\">
      <div class=\"container\">
        ";
            // line 642
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["messages"] ?? null), 642, $this->source), "html", null, true);
            echo "
      </div>
    </section>
  ";
        }
        // line 646
        echo "
  ";
        // line 647
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "help", [], "any", false, false, true, 647)) {
            // line 648
            echo "    <section id=\"help\" class=\"help\">
      <div class=\"container\">
        ";
            // line 650
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "help", [], "any", false, false, true, 650), 650, $this->source), "html", null, true);
            echo "
      </div>
    </section>
  ";
        }
        // line 654
        echo "
  ";
        // line 655
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 655) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 655)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 655)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 655))) {
            // line 656
            echo "  <div class=\"\">
    <div class=\"row\">
      ";
            // line 658
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 658)) {
                // line 659
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 659) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 659)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 659))) {
                    // line 660
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 661
($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 661) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 661))) {
                    // line 662
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 663
($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 663) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 663))) {
                    // line 664
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 665
($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 665) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 665))) {
                    // line 666
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 667
($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 667) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 667)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 667))) {
                    // line 668
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 670
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 672
                echo "          <div class=\"contentbottom1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 672), 672, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 675
            echo "
      ";
            // line 676
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 676)) {
                // line 677
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 677) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 677)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 677))) {
                    // line 678
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 679
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 679) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 679))) {
                    // line 680
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 681
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 681) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 681))) {
                    // line 682
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 683
($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 683) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 683))) {
                    // line 684
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 685
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 685) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 685)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 685))) {
                    // line 686
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 688
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 690
                echo "          <div class=\"contentbottom2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 690), 690, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 693
            echo "
      ";
            // line 694
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 694)) {
                // line 695
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 695) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 695)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 695))) {
                    // line 696
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 697
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 697) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 697))) {
                    // line 698
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 699
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 699) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 699))) {
                    // line 700
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 701
($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 701) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 701))) {
                    // line 702
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 703
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 703) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 703)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 703))) {
                    // line 704
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 706
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 708
                echo "          <div class=\"contentbottom3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 708), 708, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 711
            echo "
      ";
            // line 712
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 712)) {
                // line 713
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 713) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 713)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 713))) {
                    // line 714
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 715
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 715) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 715))) {
                    // line 716
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 717
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 717) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 717))) {
                    // line 718
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 719
($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 719) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 719))) {
                    // line 720
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 721
($context["page"] ?? null), "contentbottom1", [], "any", false, false, true, 721) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom2", [], "any", false, false, true, 721)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom3", [], "any", false, false, true, 721))) {
                    // line 722
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 724
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 726
                echo "          <div class=\"contentbottom4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "contentbottom4", [], "any", false, false, true, 726), 726, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 729
            echo "
    </div>
  </div>
";
        }
        // line 733
        echo "
";
        // line 734
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 734) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 734)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 734)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 734))) {
            // line 735
            echo "  <div class=\"container\">
    <div class=\"row\">
      ";
            // line 737
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 737)) {
                // line 738
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 738) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 738)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 738))) {
                    // line 739
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 740
($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 740) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 740))) {
                    // line 741
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 742
($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 742) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 742))) {
                    // line 743
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 744
($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 744) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 744))) {
                    // line 745
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 746
($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 746) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 746)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 746))) {
                    // line 747
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 749
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 751
                echo "          <div class=\"bottom_line1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 751), 751, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 754
            echo "
      ";
            // line 755
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 755)) {
                // line 756
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 756) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 756)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 756))) {
                    // line 757
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 758
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 758) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 758))) {
                    // line 759
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 760
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 760) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 760))) {
                    // line 761
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 762
($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 762) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 762))) {
                    // line 763
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 764
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 764) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 764)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 764))) {
                    // line 765
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 767
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 769
                echo "          <div class=\"bottom_line2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 769), 769, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 772
            echo "
      ";
            // line 773
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 773)) {
                // line 774
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 774) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 774)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 774))) {
                    // line 775
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 776
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 776) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 776))) {
                    // line 777
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 778
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 778) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 778))) {
                    // line 779
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 780
($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 780) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 780))) {
                    // line 781
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 782
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 782) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 782)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 782))) {
                    // line 783
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 785
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 787
                echo "          <div class=\"bottom_line3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 787), 787, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 790
            echo "
      ";
            // line 791
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 791)) {
                // line 792
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 792) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 792)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 792))) {
                    // line 793
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 794
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 794) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 794))) {
                    // line 795
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 796
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 796) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 796))) {
                    // line 797
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 798
($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 798) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 798))) {
                    // line 799
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 800
($context["page"] ?? null), "bottom_line1", [], "any", false, false, true, 800) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line2", [], "any", false, false, true, 800)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line3", [], "any", false, false, true, 800))) {
                    // line 801
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 803
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 805
                echo "          <div class=\"bottom_line4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom_line4", [], "any", false, false, true, 805), 805, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 808
            echo "
    </div>
  </div>
";
        }
        // line 812
        echo "
";
        // line 813
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom1", [], "any", false, false, true, 813) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 813)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 813)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 813))) {
            // line 814
            echo "<div id=\"page6\">
  <div class=\"container\">
    <div class=\"row\">
      ";
            // line 817
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom1", [], "any", false, false, true, 817)) {
                // line 818
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 818) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 818)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 818))) {
                    // line 819
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 820
($context["page"] ?? null), "bottom2", [], "any", false, false, true, 820) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 820))) {
                    // line 821
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 822
($context["page"] ?? null), "bottom2", [], "any", false, false, true, 822) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 822))) {
                    // line 823
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 824
($context["page"] ?? null), "bottom3", [], "any", false, false, true, 824) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 824))) {
                    // line 825
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 826
($context["page"] ?? null), "bottom2", [], "any", false, false, true, 826) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 826)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 826))) {
                    // line 827
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 829
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 831
                echo "          <div class=\"bottom1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom1", [], "any", false, false, true, 831), 831, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 834
            echo "
      ";
            // line 835
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 835)) {
                // line 836
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom1", [], "any", false, false, true, 836) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 836)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 836))) {
                    // line 837
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 838
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 838) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 838))) {
                    // line 839
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 840
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 840) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 840))) {
                    // line 841
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 842
($context["page"] ?? null), "bottom3", [], "any", false, false, true, 842) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 842))) {
                    // line 843
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 844
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 844) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 844)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 844))) {
                    // line 845
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 847
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 849
                echo "          <div class=\"bottom2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 849), 849, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 852
            echo "
      ";
            // line 853
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 853)) {
                // line 854
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom1", [], "any", false, false, true, 854) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 854)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 854))) {
                    // line 855
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 856
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 856) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 856))) {
                    // line 857
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 858
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 858) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 858))) {
                    // line 859
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 860
($context["page"] ?? null), "bottom2", [], "any", false, false, true, 860) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 860))) {
                    // line 861
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 862
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 862) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 862)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 862))) {
                    // line 863
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 865
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 867
                echo "          <div class=\"bottom3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 867), 867, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 870
            echo "
      ";
            // line 871
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 871)) {
                // line 872
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom1", [], "any", false, false, true, 872) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 872)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 872))) {
                    // line 873
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 874
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 874) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 874))) {
                    // line 875
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 876
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 876) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 876))) {
                    // line 877
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 878
($context["page"] ?? null), "bottom2", [], "any", false, false, true, 878) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 878))) {
                    // line 879
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 880
($context["page"] ?? null), "bottom1", [], "any", false, false, true, 880) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom2", [], "any", false, false, true, 880)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom3", [], "any", false, false, true, 880))) {
                    // line 881
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 883
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 885
                echo "          <div class=\"bottom4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "bottom4", [], "any", false, false, true, 885), 885, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 888
            echo "
    </div>
  </div>
</div>  
";
        }
        // line 893
        echo "
";
        // line 894
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last1", [], "any", false, false, true, 894) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 894)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 894)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 894))) {
            // line 895
            echo "  
    <div class=\"row\">
      ";
            // line 897
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last1", [], "any", false, false, true, 897)) {
                // line 898
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 898) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 898)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 898))) {
                    // line 899
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 900
($context["page"] ?? null), "last2", [], "any", false, false, true, 900) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 900))) {
                    // line 901
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 902
($context["page"] ?? null), "last2", [], "any", false, false, true, 902) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 902))) {
                    // line 903
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 904
($context["page"] ?? null), "last3", [], "any", false, false, true, 904) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 904))) {
                    // line 905
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 906
($context["page"] ?? null), "last2", [], "any", false, false, true, 906) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 906)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 906))) {
                    // line 907
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 909
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 911
                echo "          <div class=\"last1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last1", [], "any", false, false, true, 911), 911, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 914
            echo "
      ";
            // line 915
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 915)) {
                // line 916
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last1", [], "any", false, false, true, 916) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 916)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 916))) {
                    // line 917
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 918
($context["page"] ?? null), "last1", [], "any", false, false, true, 918) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 918))) {
                    // line 919
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 920
($context["page"] ?? null), "last1", [], "any", false, false, true, 920) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 920))) {
                    // line 921
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 922
($context["page"] ?? null), "last3", [], "any", false, false, true, 922) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 922))) {
                    // line 923
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 924
($context["page"] ?? null), "last1", [], "any", false, false, true, 924) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 924)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 924))) {
                    // line 925
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 927
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 929
                echo "          <div class=\"last2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 929), 929, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 932
            echo "
      ";
            // line 933
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 933)) {
                // line 934
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last1", [], "any", false, false, true, 934) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 934)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 934))) {
                    // line 935
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 936
($context["page"] ?? null), "last1", [], "any", false, false, true, 936) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 936))) {
                    // line 937
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 938
($context["page"] ?? null), "last1", [], "any", false, false, true, 938) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 938))) {
                    // line 939
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 940
($context["page"] ?? null), "last2", [], "any", false, false, true, 940) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 940))) {
                    // line 941
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 942
($context["page"] ?? null), "last1", [], "any", false, false, true, 942) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 942)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 942))) {
                    // line 943
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 945
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 947
                echo "          <div class=\"last3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 947), 947, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 950
            echo "
      ";
            // line 951
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 951)) {
                // line 952
                echo "        ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last1", [], "any", false, false, true, 952) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 952)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 952))) {
                    // line 953
                    echo "          <div class=\"col-lg-3\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 954
($context["page"] ?? null), "last1", [], "any", false, false, true, 954) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 954))) {
                    // line 955
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 956
($context["page"] ?? null), "last1", [], "any", false, false, true, 956) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 956))) {
                    // line 957
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 958
($context["page"] ?? null), "last2", [], "any", false, false, true, 958) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 958))) {
                    // line 959
                    echo "            <div class=\"col-lg-4\">
          ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 960
($context["page"] ?? null), "last1", [], "any", false, false, true, 960) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last2", [], "any", false, false, true, 960)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last3", [], "any", false, false, true, 960))) {
                    // line 961
                    echo "            <div class=\"col-lg-6\">
          ";
                } else {
                    // line 963
                    echo "            <div class=\"col-lg-12\">
        ";
                }
                // line 965
                echo "          <div class=\"last4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "last4", [], "any", false, false, true, 965), 965, $this->source), "html", null, true);
                echo "</div>
        </div>
      ";
            }
            // line 968
            echo "
    
  </div>
";
        }
        // line 972
        echo "
  ";
        // line 973
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_first_1", [], "any", false, false, true, 973)) {
            // line 974
            echo "    <section id=\"panel_first\" class=\"panel_first\">
      <div class=\"container\">
        <div class=\"row\">
          <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">
            ";
            // line 978
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_first_1", [], "any", false, false, true, 978), 978, $this->source), "html", null, true);
            echo "
          </div>
        </div>
      </div>
    </section>
  ";
        }
        // line 984
        echo "
  ";
        // line 985
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_1", [], "any", false, false, true, 985) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_2", [], "any", false, false, true, 985)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_3", [], "any", false, false, true, 985)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_4", [], "any", false, false, true, 985))) {
            // line 986
            echo "    <section id=\"panel_second\" class=\"panel_second\">
      <div class=\"container\">
        <div class=\"row\">
          <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">
            ";
            // line 990
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_1", [], "any", false, false, true, 990), 990, $this->source), "html", null, true);
            echo "
          </div>
          <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">
            ";
            // line 993
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_2", [], "any", false, false, true, 993), 993, $this->source), "html", null, true);
            echo "
          </div>
          <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">
            ";
            // line 996
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_3", [], "any", false, false, true, 996), 996, $this->source), "html", null, true);
            echo "
          </div>
          <div class=\"col-lg-3 col-md-3 col-sm-12 col-xs-12\">
            ";
            // line 999
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "panel_second_4", [], "any", false, false, true, 999), 999, $this->source), "html", null, true);
            echo "
          </div>
        </div>
      </div>
    </section>
  ";
        }
        // line 1005
        echo "
  ";
        // line 1006
        if (($context["breadcrumb"] ?? null)) {
            // line 1007
            echo "    <section id=\"breadcrumb\" class=\"breadcrumb\">
      <div class=\"container\">
        ";
            // line 1009
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["breadcrumb"] ?? null), 1009, $this->source), "html", null, true);
            echo "
      </div>
    </section>
  ";
        }
        // line 1013
        echo "  <!-- <a href=\"#Top\" class=\"btn-btt\" title=\"Back to Top\" style=\"display: block;\"></a>   -->        
</div>
  <footer id=\"footer\" class=\"site-footer\" role=\"contentinfo\">
    ";
        // line 1016
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer", [], "any", false, false, true, 1016)) {
            // line 1017
            echo "      <div class=\"container\">
        <div class=\"row\">
          ";
            // line 1019
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer", [], "any", false, false, true, 1019), 1019, $this->source), "html", null, true);
            echo "
        </div>
      </div>
    ";
        }
        // line 1023
        echo "
    <div class=\"container\">
      <div class=\"row\">
        <div class=\"layout-container\">
        ";
        // line 1027
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_first", [], "any", false, false, true, 1027) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_second", [], "any", false, false, true, 1027)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_third", [], "any", false, false, true, 1027)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_fourth", [], "any", false, false, true, 1027))) {
            // line 1028
            echo "          <div class=\"site-footer__top clearfix\">
            ";
            // line 1029
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_first", [], "any", false, false, true, 1029), 1029, $this->source), "html", null, true);
            echo "
            ";
            // line 1030
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_second", [], "any", false, false, true, 1030), 1030, $this->source), "html", null, true);
            echo "
            ";
            // line 1031
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_third", [], "any", false, false, true, 1031), 1031, $this->source), "html", null, true);
            echo "
            ";
            // line 1032
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_fourth", [], "any", false, false, true, 1032), 1032, $this->source), "html", null, true);
            echo "
          </div>
        ";
        }
        // line 1035
        echo "        ";
        if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_fifth", [], "any", false, false, true, 1035)) {
            // line 1036
            echo "          <div class=\"site-footer__bottom\">
            ";
            // line 1037
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer_fifth", [], "any", false, false, true, 1037), 1037, $this->source), "html", null, true);
            echo "
          </div>
        ";
        }
        // line 1040
        echo "      </div>
      </div>
    </div>

    ";
        // line 1044
        if ((((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer1", [], "any", false, false, true, 1044) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1044)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1044)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1044))) {
            // line 1045
            echo "      <div class=\"container\">
        <div class=\"row\">
          ";
            // line 1047
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer1", [], "any", false, false, true, 1047)) {
                // line 1048
                echo "            ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1048) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1048)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1048))) {
                    // line 1049
                    echo "              <div class=\"col-lg-3\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1050
($context["page"] ?? null), "footer2", [], "any", false, false, true, 1050) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1050))) {
                    // line 1051
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1052
($context["page"] ?? null), "footer2", [], "any", false, false, true, 1052) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1052))) {
                    // line 1053
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1054
($context["page"] ?? null), "footer3", [], "any", false, false, true, 1054) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1054))) {
                    // line 1055
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 1056
($context["page"] ?? null), "footer2", [], "any", false, false, true, 1056) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1056)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1056))) {
                    // line 1057
                    echo "                <div class=\"col-lg-6\">
              ";
                } else {
                    // line 1059
                    echo "                <div class=\"col-lg-12\">
            ";
                }
                // line 1061
                echo "              <div class=\"footer1\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer1", [], "any", false, false, true, 1061), 1061, $this->source), "html", null, true);
                echo "</div>
            </div>
          ";
            }
            // line 1064
            echo "
          ";
            // line 1065
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1065)) {
                // line 1066
                echo "            ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer1", [], "any", false, false, true, 1066) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1066)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1066))) {
                    // line 1067
                    echo "              <div class=\"col-lg-3\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1068
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1068) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1068))) {
                    // line 1069
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1070
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1070) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1070))) {
                    // line 1071
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1072
($context["page"] ?? null), "footer3", [], "any", false, false, true, 1072) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1072))) {
                    // line 1073
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 1074
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1074) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1074)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1074))) {
                    // line 1075
                    echo "                <div class=\"col-lg-6\">
              ";
                } else {
                    // line 1077
                    echo "                <div class=\"col-lg-12\">
            ";
                }
                // line 1079
                echo "              <div class=\"footer2\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1079), 1079, $this->source), "html", null, true);
                echo "</div>
            </div>
          ";
            }
            // line 1082
            echo "
          ";
            // line 1083
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1083)) {
                // line 1084
                echo "            ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer1", [], "any", false, false, true, 1084) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1084)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1084))) {
                    // line 1085
                    echo "              <div class=\"col-lg-3\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1086
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1086) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1086))) {
                    // line 1087
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1088
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1088) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1088))) {
                    // line 1089
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1090
($context["page"] ?? null), "footer2", [], "any", false, false, true, 1090) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1090))) {
                    // line 1091
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 1092
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1092) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1092)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1092))) {
                    // line 1093
                    echo "                <div class=\"col-lg-6\">
              ";
                } else {
                    // line 1095
                    echo "                <div class=\"col-lg-12\">
            ";
                }
                // line 1097
                echo "              <div class=\"footer3\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1097), 1097, $this->source), "html", null, true);
                echo "</div>
            </div>
          ";
            }
            // line 1100
            echo "
          ";
            // line 1101
            if (twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1101)) {
                // line 1102
                echo "            ";
                if (((twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer1", [], "any", false, false, true, 1102) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1102)) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1102))) {
                    // line 1103
                    echo "              <div class=\"col-lg-3\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1104
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1104) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1104))) {
                    // line 1105
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1106
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1106) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1106))) {
                    // line 1107
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif ((twig_get_attribute($this->env, $this->source,                 // line 1108
($context["page"] ?? null), "footer2", [], "any", false, false, true, 1108) && twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1108))) {
                    // line 1109
                    echo "                <div class=\"col-lg-4\">
              ";
                } elseif (((twig_get_attribute($this->env, $this->source,                 // line 1110
($context["page"] ?? null), "footer1", [], "any", false, false, true, 1110) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer2", [], "any", false, false, true, 1110)) || twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer3", [], "any", false, false, true, 1110))) {
                    // line 1111
                    echo "                <div class=\"col-lg-6\">
              ";
                } else {
                    // line 1113
                    echo "                <div class=\"col-lg-12\">
            ";
                }
                // line 1115
                echo "              <div class=\"footer4\">";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "footer4", [], "any", false, false, true, 1115), 1115, $this->source), "html", null, true);
                echo "</div>
            </div>
          ";
            }
            // line 1118
            echo "
          </div>

        ";
        }
        // line 1122
        echo "
        <div class=\"bottom_footer\">
        <div class=\"\">
          <div class=\"row\">
              ";
        // line 1126
        if (($context["show_hide_copyright"] ?? null)) {
            // line 1127
            echo "                <div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">
                    <div class=\"copyright\">
                        <a href=\"";
            // line 1129
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["copyright_url"] ?? null), 1129, $this->source), "html", null, true);
            echo "\" target=\"_blank\">
                          ";
            // line 1130
            echo t("@copyright_date @copyright_developedby", array("@copyright_date" =>             // line 1131
($context["copyright_date"] ?? null), "@copyright_developedby" => ($context["copyright_developedby"] ?? null), ));
            // line 1133
            echo "                        </a>
                    </div>
                </div>
              ";
        }
        // line 1137
        echo "          </div>
        </div>
        </div>
        </div>
  </footer>
</div>
</div>";
    }

    public function getTemplateName()
    {
        return "themes/contrib/photographer/templates/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  2514 => 1137,  2508 => 1133,  2506 => 1131,  2505 => 1130,  2501 => 1129,  2497 => 1127,  2495 => 1126,  2489 => 1122,  2483 => 1118,  2476 => 1115,  2472 => 1113,  2468 => 1111,  2466 => 1110,  2463 => 1109,  2461 => 1108,  2458 => 1107,  2456 => 1106,  2453 => 1105,  2451 => 1104,  2448 => 1103,  2445 => 1102,  2443 => 1101,  2440 => 1100,  2433 => 1097,  2429 => 1095,  2425 => 1093,  2423 => 1092,  2420 => 1091,  2418 => 1090,  2415 => 1089,  2413 => 1088,  2410 => 1087,  2408 => 1086,  2405 => 1085,  2402 => 1084,  2400 => 1083,  2397 => 1082,  2390 => 1079,  2386 => 1077,  2382 => 1075,  2380 => 1074,  2377 => 1073,  2375 => 1072,  2372 => 1071,  2370 => 1070,  2367 => 1069,  2365 => 1068,  2362 => 1067,  2359 => 1066,  2357 => 1065,  2354 => 1064,  2347 => 1061,  2343 => 1059,  2339 => 1057,  2337 => 1056,  2334 => 1055,  2332 => 1054,  2329 => 1053,  2327 => 1052,  2324 => 1051,  2322 => 1050,  2319 => 1049,  2316 => 1048,  2314 => 1047,  2310 => 1045,  2308 => 1044,  2302 => 1040,  2296 => 1037,  2293 => 1036,  2290 => 1035,  2284 => 1032,  2280 => 1031,  2276 => 1030,  2272 => 1029,  2269 => 1028,  2267 => 1027,  2261 => 1023,  2254 => 1019,  2250 => 1017,  2248 => 1016,  2243 => 1013,  2236 => 1009,  2232 => 1007,  2230 => 1006,  2227 => 1005,  2218 => 999,  2212 => 996,  2206 => 993,  2200 => 990,  2194 => 986,  2192 => 985,  2189 => 984,  2180 => 978,  2174 => 974,  2172 => 973,  2169 => 972,  2163 => 968,  2156 => 965,  2152 => 963,  2148 => 961,  2146 => 960,  2143 => 959,  2141 => 958,  2138 => 957,  2136 => 956,  2133 => 955,  2131 => 954,  2128 => 953,  2125 => 952,  2123 => 951,  2120 => 950,  2113 => 947,  2109 => 945,  2105 => 943,  2103 => 942,  2100 => 941,  2098 => 940,  2095 => 939,  2093 => 938,  2090 => 937,  2088 => 936,  2085 => 935,  2082 => 934,  2080 => 933,  2077 => 932,  2070 => 929,  2066 => 927,  2062 => 925,  2060 => 924,  2057 => 923,  2055 => 922,  2052 => 921,  2050 => 920,  2047 => 919,  2045 => 918,  2042 => 917,  2039 => 916,  2037 => 915,  2034 => 914,  2027 => 911,  2023 => 909,  2019 => 907,  2017 => 906,  2014 => 905,  2012 => 904,  2009 => 903,  2007 => 902,  2004 => 901,  2002 => 900,  1999 => 899,  1996 => 898,  1994 => 897,  1990 => 895,  1988 => 894,  1985 => 893,  1978 => 888,  1971 => 885,  1967 => 883,  1963 => 881,  1961 => 880,  1958 => 879,  1956 => 878,  1953 => 877,  1951 => 876,  1948 => 875,  1946 => 874,  1943 => 873,  1940 => 872,  1938 => 871,  1935 => 870,  1928 => 867,  1924 => 865,  1920 => 863,  1918 => 862,  1915 => 861,  1913 => 860,  1910 => 859,  1908 => 858,  1905 => 857,  1903 => 856,  1900 => 855,  1897 => 854,  1895 => 853,  1892 => 852,  1885 => 849,  1881 => 847,  1877 => 845,  1875 => 844,  1872 => 843,  1870 => 842,  1867 => 841,  1865 => 840,  1862 => 839,  1860 => 838,  1857 => 837,  1854 => 836,  1852 => 835,  1849 => 834,  1842 => 831,  1838 => 829,  1834 => 827,  1832 => 826,  1829 => 825,  1827 => 824,  1824 => 823,  1822 => 822,  1819 => 821,  1817 => 820,  1814 => 819,  1811 => 818,  1809 => 817,  1804 => 814,  1802 => 813,  1799 => 812,  1793 => 808,  1786 => 805,  1782 => 803,  1778 => 801,  1776 => 800,  1773 => 799,  1771 => 798,  1768 => 797,  1766 => 796,  1763 => 795,  1761 => 794,  1758 => 793,  1755 => 792,  1753 => 791,  1750 => 790,  1743 => 787,  1739 => 785,  1735 => 783,  1733 => 782,  1730 => 781,  1728 => 780,  1725 => 779,  1723 => 778,  1720 => 777,  1718 => 776,  1715 => 775,  1712 => 774,  1710 => 773,  1707 => 772,  1700 => 769,  1696 => 767,  1692 => 765,  1690 => 764,  1687 => 763,  1685 => 762,  1682 => 761,  1680 => 760,  1677 => 759,  1675 => 758,  1672 => 757,  1669 => 756,  1667 => 755,  1664 => 754,  1657 => 751,  1653 => 749,  1649 => 747,  1647 => 746,  1644 => 745,  1642 => 744,  1639 => 743,  1637 => 742,  1634 => 741,  1632 => 740,  1629 => 739,  1626 => 738,  1624 => 737,  1620 => 735,  1618 => 734,  1615 => 733,  1609 => 729,  1602 => 726,  1598 => 724,  1594 => 722,  1592 => 721,  1589 => 720,  1587 => 719,  1584 => 718,  1582 => 717,  1579 => 716,  1577 => 715,  1574 => 714,  1571 => 713,  1569 => 712,  1566 => 711,  1559 => 708,  1555 => 706,  1551 => 704,  1549 => 703,  1546 => 702,  1544 => 701,  1541 => 700,  1539 => 699,  1536 => 698,  1534 => 697,  1531 => 696,  1528 => 695,  1526 => 694,  1523 => 693,  1516 => 690,  1512 => 688,  1508 => 686,  1506 => 685,  1503 => 684,  1501 => 683,  1498 => 682,  1496 => 681,  1493 => 680,  1491 => 679,  1488 => 678,  1485 => 677,  1483 => 676,  1480 => 675,  1473 => 672,  1469 => 670,  1465 => 668,  1463 => 667,  1460 => 666,  1458 => 665,  1455 => 664,  1453 => 663,  1450 => 662,  1448 => 661,  1445 => 660,  1442 => 659,  1440 => 658,  1436 => 656,  1434 => 655,  1431 => 654,  1424 => 650,  1420 => 648,  1418 => 647,  1415 => 646,  1408 => 642,  1404 => 640,  1402 => 639,  1399 => 638,  1392 => 634,  1388 => 632,  1386 => 631,  1377 => 626,  1371 => 623,  1368 => 622,  1366 => 621,  1360 => 618,  1355 => 616,  1352 => 615,  1346 => 613,  1344 => 612,  1338 => 610,  1332 => 608,  1330 => 607,  1326 => 606,  1321 => 604,  1316 => 602,  1310 => 601,  1307 => 600,  1301 => 597,  1298 => 596,  1296 => 595,  1293 => 594,  1289 => 592,  1283 => 589,  1280 => 588,  1278 => 587,  1272 => 584,  1268 => 583,  1265 => 582,  1259 => 580,  1257 => 579,  1252 => 577,  1246 => 575,  1240 => 573,  1238 => 572,  1234 => 571,  1229 => 569,  1223 => 568,  1220 => 567,  1214 => 564,  1211 => 563,  1209 => 562,  1206 => 561,  1204 => 560,  1193 => 551,  1187 => 547,  1180 => 544,  1176 => 542,  1172 => 540,  1170 => 539,  1167 => 538,  1165 => 537,  1162 => 536,  1160 => 535,  1157 => 534,  1155 => 533,  1152 => 532,  1149 => 531,  1147 => 530,  1144 => 529,  1137 => 526,  1133 => 524,  1129 => 522,  1127 => 521,  1124 => 520,  1122 => 519,  1119 => 518,  1117 => 517,  1114 => 516,  1112 => 515,  1109 => 514,  1106 => 513,  1104 => 512,  1101 => 511,  1094 => 508,  1090 => 506,  1086 => 504,  1084 => 503,  1081 => 502,  1079 => 501,  1076 => 500,  1074 => 499,  1071 => 498,  1069 => 497,  1066 => 496,  1063 => 495,  1061 => 494,  1058 => 493,  1051 => 490,  1047 => 488,  1043 => 486,  1041 => 485,  1038 => 484,  1036 => 483,  1033 => 482,  1031 => 481,  1028 => 480,  1026 => 479,  1023 => 478,  1020 => 477,  1018 => 476,  1013 => 473,  1011 => 472,  1008 => 471,  1002 => 467,  995 => 464,  991 => 462,  987 => 460,  985 => 459,  982 => 458,  980 => 457,  977 => 456,  975 => 455,  972 => 454,  970 => 453,  967 => 452,  964 => 451,  962 => 450,  959 => 449,  952 => 446,  948 => 444,  944 => 442,  942 => 441,  939 => 440,  937 => 439,  934 => 438,  932 => 437,  929 => 436,  927 => 435,  924 => 434,  921 => 433,  919 => 432,  916 => 431,  909 => 428,  905 => 426,  901 => 424,  899 => 423,  896 => 422,  894 => 421,  891 => 420,  889 => 419,  886 => 418,  884 => 417,  881 => 416,  878 => 415,  876 => 414,  873 => 413,  866 => 410,  862 => 408,  858 => 406,  856 => 405,  853 => 404,  851 => 403,  848 => 402,  846 => 401,  843 => 400,  841 => 399,  838 => 398,  835 => 397,  833 => 396,  828 => 393,  826 => 392,  823 => 391,  815 => 386,  810 => 383,  808 => 382,  805 => 381,  799 => 377,  792 => 374,  788 => 372,  784 => 370,  782 => 369,  779 => 368,  777 => 367,  774 => 366,  772 => 365,  769 => 364,  767 => 363,  764 => 362,  761 => 361,  759 => 360,  756 => 359,  749 => 356,  745 => 354,  741 => 352,  739 => 351,  736 => 350,  734 => 349,  731 => 348,  729 => 347,  726 => 346,  724 => 345,  721 => 344,  718 => 343,  716 => 342,  712 => 340,  705 => 338,  701 => 336,  697 => 334,  695 => 333,  692 => 332,  690 => 331,  687 => 330,  685 => 329,  682 => 328,  680 => 327,  677 => 326,  674 => 325,  672 => 324,  669 => 323,  662 => 320,  658 => 318,  654 => 316,  652 => 315,  649 => 314,  647 => 313,  644 => 312,  642 => 311,  639 => 310,  637 => 309,  634 => 308,  631 => 307,  629 => 306,  624 => 303,  622 => 302,  619 => 301,  613 => 297,  606 => 294,  602 => 292,  598 => 290,  596 => 289,  593 => 288,  591 => 287,  588 => 286,  586 => 285,  583 => 284,  581 => 283,  578 => 282,  575 => 281,  573 => 280,  570 => 279,  563 => 276,  559 => 274,  555 => 272,  553 => 271,  550 => 270,  548 => 269,  545 => 268,  543 => 267,  540 => 266,  538 => 265,  535 => 264,  532 => 263,  530 => 262,  526 => 260,  519 => 258,  515 => 256,  511 => 254,  509 => 253,  506 => 252,  504 => 251,  501 => 250,  499 => 249,  496 => 248,  494 => 247,  491 => 246,  488 => 245,  486 => 244,  483 => 243,  476 => 240,  472 => 238,  468 => 236,  466 => 235,  463 => 234,  461 => 233,  458 => 232,  456 => 231,  453 => 230,  451 => 229,  448 => 228,  445 => 227,  443 => 226,  439 => 224,  437 => 223,  434 => 222,  428 => 218,  421 => 215,  417 => 213,  413 => 211,  411 => 210,  408 => 209,  406 => 208,  403 => 207,  401 => 206,  398 => 205,  396 => 204,  393 => 203,  390 => 202,  388 => 201,  385 => 200,  378 => 197,  374 => 195,  370 => 193,  368 => 192,  365 => 191,  363 => 190,  360 => 189,  358 => 188,  355 => 187,  353 => 186,  350 => 185,  347 => 184,  345 => 183,  342 => 182,  335 => 179,  331 => 177,  327 => 175,  325 => 174,  322 => 173,  320 => 172,  317 => 171,  315 => 170,  312 => 169,  310 => 168,  307 => 167,  304 => 166,  302 => 165,  299 => 164,  292 => 161,  288 => 159,  284 => 157,  282 => 156,  279 => 155,  277 => 154,  274 => 153,  272 => 152,  269 => 151,  267 => 150,  264 => 149,  261 => 148,  259 => 147,  254 => 144,  252 => 143,  246 => 139,  239 => 135,  235 => 133,  233 => 132,  212 => 113,  205 => 109,  201 => 107,  199 => 106,  195 => 104,  190 => 101,  184 => 100,  175 => 96,  171 => 95,  168 => 94,  165 => 93,  160 => 92,  158 => 90,  157 => 89,  156 => 88,  155 => 87,  154 => 86,  153 => 85,  152 => 84,  151 => 83,  150 => 82,  149 => 81,  148 => 80,  147 => 79,  143 => 77,  141 => 76,  121 => 59,  106 => 47,  93 => 36,  85 => 31,  80 => 28,  78 => 27,  73 => 24,  65 => 19,  57 => 13,  55 => 12,  49 => 9,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/photographer/templates/page.html.twig", "/app/themes/contrib/photographer/templates/page.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 12, "set" => 79, "for" => 92, "trans" => 1130);
        static $filters = array("escape" => 9);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'for', 'trans'],
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
