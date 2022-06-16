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

/* core/themes/stable/templates/admin/image-style-preview.html.twig */
class __TwigTemplate_601323421175b7bad0835c9c770416858f73eb2b1210471c50f8864ac64a7b76 extends \Twig\Template
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
        // line 31
        echo "<div class=\"image-style-preview preview clearfix\">
  ";
        // line 33
        echo "  <div class=\"preview-image-wrapper\">
      ";
        // line 34
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("original"));
        echo " (<a href=\"";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["original"] ?? null), "url", [], "any", false, false, true, 34), 34, $this->source), "html", null, true);
        echo "\">";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("view actual size"));
        echo "</a>)
      <div class=\"preview-image original-image\" style=\"width: ";
        // line 35
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "original", [], "any", false, false, true, 35), "width", [], "any", false, false, true, 35), 35, $this->source), "html", null, true);
        echo "px; height: ";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "original", [], "any", false, false, true, 35), "height", [], "any", false, false, true, 35), 35, $this->source), "html", null, true);
        echo "px;\">
        <a href=\"";
        // line 36
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["original"] ?? null), "url", [], "any", false, false, true, 36), 36, $this->source), "html", null, true);
        echo "\">
          ";
        // line 37
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["original"] ?? null), "rendered", [], "any", false, false, true, 37), 37, $this->source), "html", null, true);
        echo "
        </a>
      <div class=\"height\" style=\"height: ";
        // line 39
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "original", [], "any", false, false, true, 39), "height", [], "any", false, false, true, 39), 39, $this->source), "html", null, true);
        echo "px\"><span>";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["original"] ?? null), "height", [], "any", false, false, true, 39), 39, $this->source), "html", null, true);
        echo "px</span></div>
      <div class=\"width\" style=\"width: ";
        // line 40
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "original", [], "any", false, false, true, 40), "width", [], "any", false, false, true, 40), 40, $this->source), "html", null, true);
        echo "px\"><span>";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["original"] ?? null), "width", [], "any", false, false, true, 40), 40, $this->source), "html", null, true);
        echo "px</span></div>
    </div>
  </div>

  ";
        // line 45
        echo "  <div class=\"preview-image-wrapper\">
    ";
        // line 46
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["style_name"] ?? null), 46, $this->source), "html", null, true);
        echo " (<a href=\"";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["derivative"] ?? null), "url", [], "any", false, false, true, 46), 46, $this->source), "html", null, true);
        echo "?";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cache_bypass"] ?? null), 46, $this->source), "html", null, true);
        echo "\">";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t("view actual size"));
        echo "</a>)
    <div class=\"preview-image modified-image\" style=\"width: ";
        // line 47
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "derivative", [], "any", false, false, true, 47), "width", [], "any", false, false, true, 47), 47, $this->source), "html", null, true);
        echo "px; height: ";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "derivative", [], "any", false, false, true, 47), "height", [], "any", false, false, true, 47), 47, $this->source), "html", null, true);
        echo "px;\">
      <a href=\"";
        // line 48
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["derivative"] ?? null), "url", [], "any", false, false, true, 48), 48, $this->source), "html", null, true);
        echo "?";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cache_bypass"] ?? null), 48, $this->source), "html", null, true);
        echo "\">
        ";
        // line 49
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["derivative"] ?? null), "rendered", [], "any", false, false, true, 49), 49, $this->source), "html", null, true);
        echo "
      </a>
      <div class=\"height\" style=\"height: ";
        // line 51
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "derivative", [], "any", false, false, true, 51), "height", [], "any", false, false, true, 51), 51, $this->source), "html", null, true);
        echo "px\"><span>";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["derivative"] ?? null), "height", [], "any", false, false, true, 51), 51, $this->source), "html", null, true);
        echo "px</span></div>
      <div class=\"width\" style=\"width: ";
        // line 52
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["preview"] ?? null), "derivative", [], "any", false, false, true, 52), "width", [], "any", false, false, true, 52), 52, $this->source), "html", null, true);
        echo "px\"><span>";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["derivative"] ?? null), "width", [], "any", false, false, true, 52), 52, $this->source), "html", null, true);
        echo "px</span></div>
    </div>
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "core/themes/stable/templates/admin/image-style-preview.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  119 => 52,  113 => 51,  108 => 49,  102 => 48,  96 => 47,  86 => 46,  83 => 45,  74 => 40,  68 => 39,  63 => 37,  59 => 36,  53 => 35,  45 => 34,  42 => 33,  39 => 31,);
    }

    public function getSourceContext()
    {
        return new Source("", "core/themes/stable/templates/admin/image-style-preview.html.twig", "/app/core/themes/stable/templates/admin/image-style-preview.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array();
        static $filters = array("t" => 34, "escape" => 34);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                [],
                ['t', 'escape'],
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
