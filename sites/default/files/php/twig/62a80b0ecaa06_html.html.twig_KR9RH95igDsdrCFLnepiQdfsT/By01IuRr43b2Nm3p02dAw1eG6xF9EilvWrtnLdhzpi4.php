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

/* themes/contrib/photographer/templates/html.html.twig */
class __TwigTemplate_b9095b2b9c2b07e8c21a80a97079596198071f9ca1ed11227f0d404011a403d5 extends \Twig\Template
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
        echo "<!DOCTYPE html>
<html";
        // line 2
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["html_attributes"] ?? null), 2, $this->source), "html", null, true);
        echo ">
  <head>
    <head-placeholder token=\"";
        // line 4
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null), 4, $this->source));
        echo "\">
    <title>";
        // line 5
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->extensions['Drupal\Core\Template\TwigExtension']->safeJoin($this->env, $this->sandbox->ensureToStringAllowed(($context["head_title"] ?? null), 5, $this->source), " | "));
        echo "</title>
    <css-placeholder token=\"";
        // line 6
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null), 6, $this->source));
        echo "\">
    <js-placeholder token=\"";
        // line 7
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null), 7, $this->source));
        echo "\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">
    <meta name=\"HandheldFriendly\" content=\"true\" />
    <meta name=\"apple-touch-fullscreen\" content=\"YES\" />
    <link href='http://fonts.googleapis.com/css?family=Indie+Flower|Rock+Salt|Shadows+Into+Light+Two|Source+Sans+Pro:
    200,300,400,600,700,900,200italic,300italic,400italic,600italic,
    700italic,900italic|Dosis:200,300,400,500,600,700,800|Abel|
    Droid+Sans:400,700|Lato:100,300,400,700,900,100italic,300italic,
    400italic,700italic,900italic|Lora:400,700,400italic,
    700italic|PT+Sans:400,700,400italic,700italic|PT+Sans+Narrow:400,700
    |Quicksand:300,400,700|Ubuntu:300,400,500,700,300italic,400italic,500italic,
    700italic|Lobster|Ubuntu+Condensed|Oxygen:400,300,700|Oswald:700,400,300
    |Open+Sans+Condensed:300,700,300italic|Roboto+Condensed:300italic,400italic,
    700italic,400,700,300|Open+Sans:300italic,400italic,600italic,700italic,
    800italic,800,700,400,600,300|Prosto+One|Francois+One|Comfortaa:700,300,400
    |Raleway:300,600,900,500,400,100,800,200,700|Roboto:300,700,500italic,900,
    300italic,400italic,900italic,100italic,100,500,400,700italic|Roboto+Slab:300,
    700,100,400|Share:700,700italic,400italic,400' rel='stylesheet' type='text/css'
  >
  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js\"></script>
  <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js\"></script>
  <link rel=\"stylesheet\" href=\"//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css\">
  <link href=\"//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css\"
  rel=\"stylesheet\">
  </head>
  <body";
        // line 32
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null), 32, $this->source), "html", null, true);
        echo ">
    <a href=\"#main-content\" class=\"visually-hidden focusable\">
      ";
        // line 34
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("Skip to main content"));
        echo "
    </a>
    ";
        // line 36
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["page_top"] ?? null), 36, $this->source), "html", null, true);
        echo "
    ";
        // line 37
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["page"] ?? null), 37, $this->source), "html", null, true);
        echo "
    ";
        // line 38
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["page_bottom"] ?? null), 38, $this->source), "html", null, true);
        echo "
    <js-bottom-placeholder token=\"";
        // line 39
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null), 39, $this->source));
        echo "\">
  </body>
</html>

";
    }

    public function getTemplateName()
    {
        return "themes/contrib/photographer/templates/html.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  109 => 39,  105 => 38,  101 => 37,  97 => 36,  92 => 34,  87 => 32,  59 => 7,  55 => 6,  51 => 5,  47 => 4,  42 => 2,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/photographer/templates/html.html.twig", "/app/themes/contrib/photographer/templates/html.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array();
        static $filters = array("escape" => 2, "raw" => 4, "safe_join" => 5, "t" => 34);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                [],
                ['escape', 'raw', 'safe_join', 't'],
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
