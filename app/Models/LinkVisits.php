<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkVisits extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',
        'link_id',
        'ip_address',
        'referer_url',
        'user_agent'
    ];
}
