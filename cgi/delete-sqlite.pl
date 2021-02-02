#!/usr/bin/perl -w

use strict;
use DBI;
my $dbfile = $ARGV[0];
if (!(defined $dbfile)) { die "No DB-file given\n"; }
my $deleteid = $ARGV[1];
if (!(defined $deleteid)) { die "No entry to delete\n"; }
my $dbargs = {AutoCommit => 0, PrintError => 1};
my $dbh = DBI->connect("dbi:SQLite:dbname=".$dbfile, "", "", $dbargs);

my $res = $dbh->selectall_arrayref("DELETE FROM wakeonlan WHERE id = '".$deleteid."';");
if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->commit();

if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->disconnect();

exit(0);
