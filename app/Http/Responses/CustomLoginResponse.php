<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;


class CustomLoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        $redirect = match ($user->role) {
            'admin' => '/admin',
            'operator' => '/operator',
            default => '/dashboard',
        };

        return redirect()->intended($redirect);
    }
}
