<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="carto"> 
  		<xsl:apply-templates select="capteurs"/>
	</xsl:template>

<xsl:template match="capteurs">
<g id="loadlayer_capts" visibility="visible" >
<xsl:apply-templates select="capteur" />
</g>
</xsl:template>

<xsl:template match="capteur">
  <xsl:for-each select=".">
   <circle id_capt="{@id_capt}" cx="{@coord_x}" cy="{@coord_y}" r="50" fill="#FFFFFF" stroke="grey" stroke-width="5" />
  </xsl:for-each>
</xsl:template>

</xsl:stylesheet>
