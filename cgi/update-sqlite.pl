#!/usr/bin/perl -w

use strict;
use DBI;
my $dbfile = $ARGV[0];
if (!(defined $dbfile)) { die "No DB-file given\n"; }
my $updateid = $ARGV[1];
if (!(defined $updateid)) { die "No entry id to update\n"; }
my $updatedata = $ARGV[2];
if (!(defined $updatedata)) { die "No data to insert supplied\n"; }
my $dbargs = {AutoCommit => 0, PrintError => 1};
my $dbh = DBI->connect("dbi:SQLite:dbname=".$dbfile, "", "", $dbargs);

my @count = $updatedata =~ /;/g;
my $fieldcount = scalar @count;

if (!($fieldcount == 5 or $fieldcount == 6)) {
	die "Invalid input data\n";
}

my ($hostname, $description, $macaddress, $subnet, $netmask, $lastknownip) = split /;/, $updatedata;

$dbh->do("UPDATE wakeonlan SET hostname = '".$hostname."', description = '".$description."', macaddress = '".$macaddress."', subnet = '".$subnet."', netmask = '".$netmask."', lastknownip = '".$lastknownip."' WHERE id = '".$updateid."';");
if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->commit();

if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->disconnect();

exit(0);
