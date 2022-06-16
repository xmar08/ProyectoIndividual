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

/* themes/contrib/zuvi/templates/layout/page--front.html.twig */
class __TwigTemplate_7522927348d16f2547a634e3624fc022ed7efad89995defc4dd94d7adb33e77f extends \Twig\Template
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
        // line 11
        $this->loadTemplate("@zuvi/template-parts/header.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 11)->display($context);
        // line 12
        $this->loadTemplate("@zuvi/template-parts/highlighted.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 12)->display($context);
        // line 13
        echo "<div id=\"main-wrapper\" class=\"main-wrapper\">
  <div class=\"container clear\">
    ";
        // line 15
        if (($context["front_sidebar"] ?? null)) {
            // line 16
            echo "      <div class=\"main-container\">
    ";
        }
        // line 18
        echo "    <main id=\"home-main\" class=\"page-content home-content clear\">
      <a id=\"main-content\" tabindex=\"-1\"></a>";
        // line 20
        echo "      ";
        $this->loadTemplate("@zuvi/template-parts/content_top.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 20)->display($context);
        // line 21
        echo "      ";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["page"] ?? null), "content", [], "any", false, false, true, 21), 21, $this->source), "html", null, true);
        echo "
      ";
        // line 22
        $this->loadTemplate("@zuvi/template-parts/content_home.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 22)->display($context);
        // line 23
        echo "      ";
        $this->loadTemplate("@zuvi/template-parts/content_bottom.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 23)->display($context);
        // line 24
        echo "    </main>
    ";
        // line 25
        if (($context["front_sidebar"] ?? null)) {
            // line 26
            echo "      ";
            $this->loadTemplate("@zuvi/template-parts/sidebar_left.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 26)->display($context);
            // line 27
            echo "      ";
            $this->loadTemplate("@zuvi/template-parts/sidebar_right.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 27)->display($context);
            // line 28
            echo "      </div>
    ";
        }
        // line 30
        echo "  </div> ";
        // line 31
        echo "</div>";
        // line 32
        $this->loadTemplate("@zuvi/template-parts/footer.html.twig", "themes/contrib/zuvi/templates/layout/page--front.html.twig", 32)->display($context);
        // line 33
        if (($context["slider_show"] ?? null)) {
            // line 34
            echo "  ";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->extensions['Drupal\Core\Template\TwigExtension']->attachLibrary("zuvi/slider"), "html", null, true);
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "themes/contrib/zuvi/templates/layout/page--front.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  92 => 34,  90 => 33,  88 => 32,  86 => 31,  84 => 30,  80 => 28,  77 => 27,  74 => 26,  72 => 25,  69 => 24,  66 => 23,  64 => 22,  59 => 21,  56 => 20,  53 => 18,  49 => 16,  47 => 15,  43 => 13,  41 => 12,  39 => 11,);
    }

    public function getSourceContext()
    {
        return new Source("", "themes/contrib/zuvi/templates/layout/page--front.html.twig", "/app/themes/contrib/zuvi/templates/layout/page--front.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("include" => 11, "if" => 15);
        static $filters = array("escape" => 21);
        static $functions = array("attach_library" => 34);

        try {
            $this->sandbox->checkSecurity(
                ['include', 'if'],
                ['escape'],
                ['attach_library']
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
