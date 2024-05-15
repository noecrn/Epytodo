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

/* server/replication/primary_replication.twig */
class __TwigTemplate_7f0cfaa87af8900d3734d377cd1894e5 extends Template
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
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        if ( !($context["clear_screen"] ?? null)) {
            // line 2
            echo "  <div class=\"card mb-2\">
    <div class=\"card-header\">";
echo _gettext("Primary replication");
            // line 3
            echo "</div>
    <div class=\"card-body\">
    ";
echo _gettext("This server is configured as primary in a replication process.");
            // line 6
            echo "    <ul>
      <li>
        <a href=\"#primary_status_href\" id=\"primary_status_href\">
          ";
echo _gettext("Show primary status");
            // line 10
            echo "        </a>
        ";
            // line 11
            echo ($context["primary_status_table"] ?? null);
            echo "
      </li>
      <li>
        <p>
          <a href=\"#primary_replicas_href\" id=\"primary_replicas_href\">
            ";
echo _gettext("Show connected replicas");
            // line 17
            echo "          </a>
        </p>

        <div id=\"replication_replicas_section\" style=\"display: none;\">
          <table class=\"table w-auto\">
            <thead>
              <tr>
                <th>";
echo _gettext("Server ID");
            // line 24
            echo "</th>
                <th>";
echo _gettext("Host");
            // line 25
            echo "</th>
              </tr>
            </thead>
            <tbody>
              ";
            // line 29
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["replicas"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["replica"]) {
                // line 30
                echo "                <tr>
                  <td class=\"text-end font-monospace\">";
                // line 31
                echo twig_escape_filter($this->env, (($__internal_compile_0 = $context["replica"]) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess ? ($__internal_compile_0["Server_id"] ?? null) : null), "html", null, true);
                echo "</td>
                  <td class=\"text-end font-monospace\">";
                // line 32
                echo twig_escape_filter($this->env, (($__internal_compile_1 = $context["replica"]) && is_array($__internal_compile_1) || $__internal_compile_1 instanceof ArrayAccess ? ($__internal_compile_1["Host"] ?? null) : null), "html", null, true);
                echo "</td>
                </tr>
              ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['replica'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 35
            echo "            </tbody>
          </table>
          <br>
          ";
            // line 38
            echo $this->env->getFilter('notice')->getCallable()(_gettext("Only replicas started with the --report-host=host_name option are visible in this list."));
            echo "
          <br>
        </div>
      </li>
      <li>
        <a href=\"";
            // line 43
            echo PhpMyAdmin\Url::getFromRoute("/server/replication");
            echo "\" data-post=\"";
            echo PhpMyAdmin\Url::getCommon(($context["url_params"] ?? null), "");
            echo "\" id=\"primary_addreplicauser_href\">
          ";
echo _gettext("Add replica replication user");
            // line 45
            echo "        </a>
      </li>
";
        }
        // line 48
        if (($context["primary_add_user"] ?? null)) {
            // line 49
            echo "    ";
            echo ($context["primary_add_replica_user"] ?? null);
            echo "
";
        } elseif ( !        // line 50
($context["clear_screen"] ?? null)) {
            // line 51
            echo "    </ul>
    </div>
  </div>
";
        }
    }

    public function getTemplateName()
    {
        return "server/replication/primary_replication.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  140 => 51,  138 => 50,  133 => 49,  131 => 48,  126 => 45,  119 => 43,  111 => 38,  106 => 35,  97 => 32,  93 => 31,  90 => 30,  86 => 29,  80 => 25,  76 => 24,  66 => 17,  57 => 11,  54 => 10,  48 => 6,  43 => 3,  39 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/replication/primary_replication.twig", "/Users/noecrn/Downloads/phpMyAdmin-5.2.1-english/templates/server/replication/primary_replication.twig");
    }
}
