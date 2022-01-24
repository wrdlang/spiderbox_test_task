<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Links extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',
        'name',
        'original_link',
        'code'
    ];

    public function visits()
    {
        return $this->hasMany(LinkVisits::class, 'link_id', "id");
    }
}
