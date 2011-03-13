use JavaScript::Beautifier qw/js_beautify/;

my $infile =shift;
open IN,$infile;
while (<IN>)
{
    $infile .= $_;
}
close IN;
my $pretty_js = js_beautify( $infile, 
			     {
				 indent_size => 4,
				 indent_character => ' ',
			     } );

print $pretty_js;


