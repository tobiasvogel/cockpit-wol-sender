#!/usr/bin/perl -w

use strict;
use DBI;
my $dbfile = $ARGV[0];
if (!(defined $dbfile)) { die "No DB-file given\n"; }
my $dbargs = {AutoCommit => 0, PrintError => 1};
my $dbh = DBI->connect("dbi:SQLite:dbname=".$dbfile, "", "", $dbargs);

my ($id, $hostname, $description, $macaddress, $subnet, $netmask, $lastknownip) = 0;

    print("<table>\n");
    print("  <thead>\n");
    print("    <tr>\n");
    print("      <th scope=\"col\" class=\"tableheader\">id</th>\n");
    print("      <th scope=\"col\" class=\"tableheader\">hostname</th>\n");
    print("      <th scope=\"col\" class=\"tableheader\">description</th>\n");
    print("      <th scope=\"col\" class=\"tableheader\">mac address</th>\n");
    print("      <th scope=\"col\" class=\"tableheader\">subnet</th>\n");
    print("      <th scope=\"col\" class=\"tableheader\">netmask</th>\n");
    print("      <th scope=\"col\" class=\"tableheader\">last known IP</th>\n");
    print("    </tr>\n");
    print("  </thead>\n");
    print("  <tbody>\n");

my $res = $dbh->selectall_arrayref("SELECT * FROM wakeonlan;");
foreach my $row (@$res) {
  ($id, $hostname, $description, $macaddress, $subnet, $netmask, $lastknownip) = @$row;
    print("    <tr>\n");
    print("      <td class=\"id\">".$id."</td>\n");
    print("      <td class=\"hostname\">".$hostname."</td>\n");
    print("      <td class=\"description\">".$description."</td>\n");
    print("      <td class=\"macaddress\">".$macaddress."</td>\n");
    print("      <td class=\"ipaddress subnet\">".$subnet."</td>\n");
    print("      <td class=\"ipaddress netmask\">".$netmask."</td>\n");
    print("      <td class=\"ipaddress\">".$lastknownip."</td>\n");
    print("    </tr>\n");
}

    print("  </tbody>\n");
    print("</table>\n");

if ($dbh->err()) { die "$DBI::errstr\n"; }
$dbh->disconnect();

exit(0);
