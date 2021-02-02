#!/usr/bin/perl -w

use strict;
use DBI;
my $dbfile = $ARGV[0];
if (!(defined $dbfile)) { die "No DB-file given\n"; }
my $insertdata = $ARGV[1];
if (!(defined $insertdata)) { die "No data to insert supplied\n"; }
my $dbargs = {AutoCommit => 0, PrintError => 1};
my $dbh = DBI->connect("dbi:SQLite:dbname=".$dbfile, "", "", $dbargs);

my @count = $insertdata =~ /;/g;
my $fieldcount = scalar @count;

if (!($fieldcount == 5 or $fieldcount == 6)) {
	die "Invalid input data\n";
}

my ($hostname, $description, $macaddress, $subnet, $netmask, $lastknownip) = split /;/, $insertdata;

$dbh->do("INSERT INTO wakeonlan (hostname, description, macaddress, subnet, netmask, lastknownip) VALUES ('".$hostname."', '".$description."', '".$macaddress."', '".$subnet."', '".$netmask."', '".$lastknownip."');");
if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->commit();

if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->disconnect();

exit(0);
