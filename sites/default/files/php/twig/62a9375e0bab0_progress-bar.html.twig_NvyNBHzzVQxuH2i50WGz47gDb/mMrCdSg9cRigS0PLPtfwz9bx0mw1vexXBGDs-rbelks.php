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

/* themes/contrib/bootstrap/templates/system/progress-bar.html.twig */
class __TwigTemplate_012e2aabb09f9a1680e2dbb59858c8e3ff6ac90ddf2f311c45ca64a1852e94b7 extends \Twig\Template
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
        // line 19
        echo "<div class=\"progress-wrapper\" aria-live=\"polite\" data-drupal-progress>
  ";
        // line 20
        if (($context["message"] ?? null)) {
            // line 21
            echo "    <div class=\"message\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["message"] ?? null), 21, $this->source), "html", null, true);
            echo "</div>
  ";
        }
        // line 23
        echo "  ";
        // line 24
        $context["classes"] = [0 => "progress", 1 => "progress-striped", 2 => "active"];
        // line 30
        echo "  <div";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method", false, false, true, 30), 30, $this->source), "html", null, true);
        echo ">
    <div class=\"progress-bar\" role=\"progressbar\" style=\"width: ";
        // line 31
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["percent"] ?? null), 31, $this->source), "html", null, true);
        echo "%\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["percent"] ?? null), 31, $this->source), "html", null, true);
        echo "\">
      <span class=\"percentage\">";
        // line 32
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["percent"] ?? null), 32, $this->source), "html", null, true);
        echo "%</span>
    </div>
  </div>
  ";
        // line 35
        if (($context["label"] ?? null)) {
            // line 36
            echo "    <div class=\"progress-label\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["label"] ?? null), 36, $this->source), "html", null, true);
            echo "</div>
  ";
        }
        // line 38
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "themes/contrib/bootstrap/templates/system/progress-bar.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  79 => 38,  73 => 36,  71 => 35,  65 => 32,  59 => 31,  54 => 30,  52 => 24,  50 => 23,  44 => 21,  42 => 20,  39 => 19,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/bootstrap/templates/system/progress-bar.html.twig", "/app/themes/contrib/bootstrap/templates/system/progress-bar.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 20, "set" => 24);
        static $filters = array("escape" => 21);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
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
