<?php

namespace App\Http\Controllers;

use App\Models\Links;
use App\Models\LinkVisits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;



class LinkController extends Controller
{
    public function visit(Request $request, $code)
    {
        $link = Links::where('code', $code)->first();

        if(!$link) {
            abort(404);
        }

        LinkVisits::create([
            'team_id' => Auth::user()->currentTeam->id,
            'link_id' => $link->id,
            'ip_address' => $request->ip(),
            'referer_url' => $request->header('referer'),
            'user_agent' => $request->header('User-Agent'),
        ]);

        return Redirect::to($link->original_link);
    }

    public function show()
    {
        Gate::authorize('view', Auth::user()->currentTeam);

        $links = Links::latest()->where('team_id', Auth::user()->currentTeam->id)->withCount('visits')->get();

        return Inertia::render('Dashboard/Show', [
            'links'=> $links
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('update', Auth::user()->currentTeam);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'link' => ['required', 'url'],
        ]);

        $link = Links::create([
            'team_id' => Auth::user()->currentTeam->id,
            'name' => $request->name,
            'original_link' => $request->link,
        ]);

        $link->code = $this->getShortenedURLFromID($link->id);
        $link->save();

        return back()->with('flash', [
            'link' => App::make('url')->to('s/'.$link->code),
        ]);
    }

    public function update(Request $request, $linkId)
    {
        Gate::authorize('update', Auth::user()->currentTeam);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'original_link' => ['required', 'url'],
        ]);

        $link = Links::where('team_id', Auth::user()->currentTeam->id)->where('id', $linkId)->first();

        if(!$link) {
            return back(404);
        }

        $link->name = $request->name;
        $link->original_link = $request->original_link;
        $link->save();

        return back(303);
    }

    public function destroy($linkId)
    {
        Gate::authorize('update', Auth::user()->currentTeam);

        Links::where('team_id', Auth::user()->currentTeam->id)->where('id', $linkId)->delete();

        return back(303);
    }

    private function getShortenedURLFromID ($integer)
    {
        $ALLOWED_CHARS = "abcdefghijklmnopqrstuvwxyz";

        $length = strlen($ALLOWED_CHARS);
        $out = "";
        while($integer > $length - 1)
        {
            $out = $ALLOWED_CHARS[fmod($integer, $length)] . $out;
            $integer = floor( $integer / $length );
        }
        return $ALLOWED_CHARS[$integer] . $out;
    }
}
