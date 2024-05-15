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

/* server/binlog/index.twig */
class __TwigTemplate_ee1d916fe0cb18f8f7e49ee2d484dee5 extends Template
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
        echo "<h2>
  ";
        // line 2
        echo PhpMyAdmin\Html\Generator::getImage("s_tbl");
        echo "
  ";
echo _gettext("Binary log");
        // line 4
        echo "</h2>

<form action=\"";
        // line 6
        echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
        echo "\" method=\"post\">
  ";
        // line 7
        echo PhpMyAdmin\Url::getHiddenInputs(($context["url_params"] ?? null));
        echo "
  <fieldset class=\"pma-fieldset\">
    <legend>
      ";
echo _gettext("Select binary log to view");
        // line 11
        echo "    </legend>

    ";
        // line 13
        $context["full_size"] = 0;
        // line 14
        echo "    <select name=\"log\">
      ";
        // line 15
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["binary_logs"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["each_log"]) {
            // line 16
            echo "        <option value=\"";
            echo twig_escape_filter($this->env, (($__internal_compile_0 = $context["each_log"]) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess ? ($__internal_compile_0["Log_name"] ?? null) : null), "html", null, true);
            echo "\"";
            // line 17
            echo ((((($__internal_compile_1 = $context["each_log"]) && is_array($__internal_compile_1) || $__internal_compile_1 instanceof ArrayAccess ? ($__internal_compile_1["Log_name"] ?? null) : null) == ($context["log"] ?? null))) ? (" selected") : (""));
            echo ">
          ";
            // line 18
            echo twig_escape_filter($this->env, (($__internal_compile_2 = $context["each_log"]) && is_array($__internal_compile_2) || $__internal_compile_2 instanceof ArrayAccess ? ($__internal_compile_2["Log_name"] ?? null) : null), "html", null, true);
            echo "
          ";
            // line 19
            if (twig_get_attribute($this->env, $this->source, $context["each_log"], "File_size", [], "array", true, true, false, 19)) {
                // line 20
                echo "            (";
                echo twig_escape_filter($this->env, twig_join_filter(PhpMyAdmin\Util::formatByteDown((($__internal_compile_3 = $context["each_log"]) && is_array($__internal_compile_3) || $__internal_compile_3 instanceof ArrayAccess ? ($__internal_compile_3["File_size"] ?? null) : null), 3, 2), " "), "html", null, true);
                echo ")
            ";
                // line 21
                $context["full_size"] = (($context["full_size"] ?? null) + (($__internal_compile_4 = $context["each_log"]) && is_array($__internal_compile_4) || $__internal_compile_4 instanceof ArrayAccess ? ($__internal_compile_4["File_size"] ?? null) : null));
                // line 22
                echo "          ";
            }
            // line 23
            echo "        </option>
      ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['each_log'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 25
        echo "    </select>
    ";
        // line 26
        echo twig_escape_filter($this->env, twig_length_filter($this->env, ($context["binary_logs"] ?? null)), "html", null, true);
        echo "
    ";
echo _gettext("Files");
        // line 27
        echo ",
    ";
        // line 28
        if ((($context["full_size"] ?? null) > 0)) {
            // line 29
            echo "      ";
            echo twig_escape_filter($this->env, twig_join_filter(PhpMyAdmin\Util::formatByteDown(($context["full_size"] ?? null)), " "), "html", null, true);
            echo "
    ";
        }
        // line 31
        echo "  </fieldset>

  <fieldset class=\"pma-fieldset tblFooters\">
    <input class=\"btn btn-primary\" type=\"submit\" value=\"";
echo _gettext("Go");
        // line 34
        echo "\">
  </fieldset>
</form>

";
        // line 38
        echo ($context["sql_message"] ?? null);
        echo "

<table class=\"table table-striped table-hover align-middle\" id=\"binlogTable\">
  <thead>
    <tr>
      <td colspan=\"6\" class=\"text-center\">
        ";
        // line 44
        if (($context["has_previous"] ?? null)) {
            // line 45
            echo "          ";
            if (($context["has_icons"] ?? null)) {
                // line 46
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["previous_params"] ?? null), "", false);
                echo "\" title=\"";
echo _pgettext("Previous page", "Previous");
                // line 47
                echo "\">
              &laquo;
            </a>
          ";
            } else {
                // line 51
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["previous_params"] ?? null), "", false);
                echo "\">
              ";
echo _pgettext("Previous page", "Previous");
                // line 52
                echo " &laquo;
            </a>
          ";
            }
            // line 55
            echo "          -
        ";
        }
        // line 57
        echo "
        ";
        // line 58
        if (($context["is_full_query"] ?? null)) {
            // line 59
            echo "          <a href=\"";
            echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
            echo "\" data-post=\"";
            echo PhpMyAdmin\Url::getCommon(($context["full_queries_params"] ?? null), "", false);
            echo "\" title=\"";
echo _gettext("Truncate shown queries");
            echo "\">
            <img src=\"";
            // line 60
            echo twig_escape_filter($this->env, $this->extensions['PhpMyAdmin\Twig\AssetExtension']->getImagePath("s_partialtext.png"), "html", null, true);
            echo "\" alt=\"";
echo _gettext("Truncate shown queries");
            echo "\">
          </a>
        ";
        } else {
            // line 63
            echo "          <a href=\"";
            echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
            echo "\" data-post=\"";
            echo PhpMyAdmin\Url::getCommon(($context["full_queries_params"] ?? null), "", false);
            echo "\" title=\"";
echo _gettext("Show full queries");
            echo "\">
            <img src=\"";
            // line 64
            echo twig_escape_filter($this->env, $this->extensions['PhpMyAdmin\Twig\AssetExtension']->getImagePath("s_fulltext.png"), "html", null, true);
            echo "\" alt=\"";
echo _gettext("Show full queries");
            echo "\">
          </a>
        ";
        }
        // line 67
        echo "
        ";
        // line 68
        if (($context["has_next"] ?? null)) {
            // line 69
            echo "          -
          ";
            // line 70
            if (($context["has_icons"] ?? null)) {
                // line 71
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["next_params"] ?? null), "", false);
                echo "\" title=\"";
echo _pgettext("Next page", "Next");
                // line 72
                echo "\">
              &raquo;
            </a>
          ";
            } else {
                // line 76
                echo "            <a href=\"";
                echo PhpMyAdmin\Url::getFromRoute("/server/binlog");
                echo "\" data-post=\"";
                echo PhpMyAdmin\Url::getCommon(($context["next_params"] ?? null), "", false);
                echo "\">
              ";
echo _pgettext("Next page", "Next");
                // line 77
                echo " &raquo;
            </a>
          ";
            }
            // line 80
            echo "        ";
        }
        // line 81
        echo "      </td>
    </tr>
    <tr class=\"text-nowrap\">
      <th>";
echo _gettext("Log name");
        // line 84
        echo "</th>
      <th>";
echo _gettext("Position");
        // line 85
        echo "</th>
      <th>";
echo _gettext("Event type");
        // line 86
        echo "</th>
      <th>";
echo _gettext("Server ID");
        // line 87
        echo "</th>
      <th>";
echo _gettext("Original position");
        // line 88
        echo "</th>
      <th>";
echo _gettext("Information");
        // line 89
        echo "</th>
    </tr>
  </thead>

  <tbody>
    ";
        // line 94
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["values"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["value"]) {
            // line 95
            echo "      <tr class=\"noclick\">
        <td>";
            // line 96
            echo twig_escape_filter($this->env, (($__internal_compile_5 = $context["value"]) && is_array($__internal_compile_5) || $__internal_compile_5 instanceof ArrayAccess ? ($__internal_compile_5["Log_name"] ?? null) : null), "html", null, true);
            echo "</td>
        <td class=\"text-end\">";
            // line 97
            echo twig_escape_filter($this->env, (($__internal_compile_6 = $context["value"]) && is_array($__internal_compile_6) || $__internal_compile_6 instanceof ArrayAccess ? ($__internal_compile_6["Pos"] ?? null) : null), "html", null, true);
            echo "</td>
        <td>";
            // line 98
            echo twig_escape_filter($this->env, (($__internal_compile_7 = $context["value"]) && is_array($__internal_compile_7) || $__internal_compile_7 instanceof ArrayAccess ? ($__internal_compile_7["Event_type"] ?? null) : null), "html", null, true);
            echo "</td>
        <td class=\"text-end\">";
            // line 99
            echo twig_escape_filter($this->env, (($__internal_compile_8 = $context["value"]) && is_array($__internal_compile_8) || $__internal_compile_8 instanceof ArrayAccess ? ($__internal_compile_8["Server_id"] ?? null) : null), "html", null, true);
            echo "</td>
        <td class=\"text-end\">";
            // line 101
            echo twig_escape_filter($this->env, ((twig_get_attribute($this->env, $this->source, $context["value"], "Orig_log_pos", [], "array", true, true, false, 101)) ? ((($__internal_compile_9 = $context["value"]) && is_array($__internal_compile_9) || $__internal_compile_9 instanceof ArrayAccess ? ($__internal_compile_9["Orig_log_pos"] ?? null) : null)) : ((($__internal_compile_10 = $context["value"]) && is_array($__internal_compile_10) || $__internal_compile_10 instanceof ArrayAccess ? ($__internal_compile_10["End_log_pos"] ?? null) : null))), "html", null, true);
            // line 102
            echo "</td>
        <td>";
            // line 103
            echo PhpMyAdmin\Html\Generator::formatSql((($__internal_compile_11 = $context["value"]) && is_array($__internal_compile_11) || $__internal_compile_11 instanceof ArrayAccess ? ($__internal_compile_11["Info"] ?? null) : null),  !($context["is_full_query"] ?? null));
            echo "</td>
      </tr>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['value'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 106
        echo "  </tbody>
</table>
";
    }

    public function getTemplateName()
    {
        return "server/binlog/index.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  327 => 106,  318 => 103,  315 => 102,  313 => 101,  309 => 99,  305 => 98,  301 => 97,  297 => 96,  294 => 95,  290 => 94,  283 => 89,  279 => 88,  275 => 87,  271 => 86,  267 => 85,  263 => 84,  257 => 81,  254 => 80,  249 => 77,  241 => 76,  235 => 72,  228 => 71,  226 => 70,  223 => 69,  221 => 68,  218 => 67,  210 => 64,  201 => 63,  193 => 60,  184 => 59,  182 => 58,  179 => 57,  175 => 55,  170 => 52,  162 => 51,  156 => 47,  149 => 46,  146 => 45,  144 => 44,  135 => 38,  129 => 34,  123 => 31,  117 => 29,  115 => 28,  112 => 27,  107 => 26,  104 => 25,  97 => 23,  94 => 22,  92 => 21,  87 => 20,  85 => 19,  81 => 18,  77 => 17,  73 => 16,  69 => 15,  66 => 14,  64 => 13,  60 => 11,  53 => 7,  49 => 6,  45 => 4,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "server/binlog/index.twig", "/Users/noecrn/Downloads/phpMyAdmin-5.2.1-english/templates/server/binlog/index.twig");
    }
}
