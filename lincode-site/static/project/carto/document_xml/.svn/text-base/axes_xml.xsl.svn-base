<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="carto"> 
  		<xsl:apply-templates select="axes"/>
	</xsl:template>

<xsl:template match="axes">
<g id="loadlayer_axes" visibility="visible">
<xsl:apply-templates select="axe" />
</g>
</xsl:template>

<xsl:template match="axes/axe">
	<g id="{@id_axe}" stroke-width="8" stroke="#0000FF">
	<xsl:apply-templates select="arc" />
	</g>
</xsl:template>

 <xsl:template match="axes/axe/arc">
 <xsl:element name="polyline">
   <xsl:attribute name="id_arc"><xsl:value-of select="./@id_arc" /></xsl:attribute>
   <xsl:attribute name="fill">none</xsl:attribute>
   <xsl:attribute name="points">
   <xsl:value-of select="." /> 
   </xsl:attribute> 
 </xsl:element>
</xsl:template>

</xsl:stylesheet>
