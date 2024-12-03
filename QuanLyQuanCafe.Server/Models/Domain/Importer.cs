using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Importer
{
    public int ImporterId { get; set; }

    public string ImporterName { get; set; } = null!;
}
